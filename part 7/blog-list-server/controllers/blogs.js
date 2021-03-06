const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const jwt = require('jsonwebtoken')



blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1, id: 1 })
    .populate('comments', { comment: 1 })

  response.json(blogs.map(b => b.toJSON()))
})



blogsRouter.post('/', async (request, response, next) => {
  const body = request.body
  const token = request.token

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)

  } catch(exception) {
    next(exception)
  }
})



blogsRouter.delete('/:id', async (request, response, next) => {
  const token = request.token

  try {

    // check token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    // check target blog's owner
    const blog = await Blog.findById(request.params.id)
    if (blog.user.toString() === decodedToken.id.toString()){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }else{
      return response.status(401).json({ error: 'only the owner can delete this item' })
    }

  } catch (exception) {
    next(exception)
  }
})



blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  try {
    const updatedBlog = await Blog
      .findByIdAndUpdate(request.params.id, blog, { new: true })
      .populate('user', { username: 1, name: 1, id: 1 })
      .populate('comments', { comment: 1 })
    response.json(updatedBlog)
  } catch (exception) {
    next(exception)
  }
})



// add comment
blogsRouter.post('/:id/comments', async (request, response, next) => {
  const body = request.body
  const token = request.token

  try {

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const comment = new Comment({
      comment: body.comment,
      blog: request.params.id
    })
    const savedComment = await comment.save()


    const blog = await Blog.findById(request.params.id)
    blog.comments = blog.comments.concat(savedComment._id)
    await blog.save()


    response.status(201).json(savedComment)

  } catch(exception) {
    next(exception)
  }

})



module.exports = blogsRouter