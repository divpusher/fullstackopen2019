const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')



beforeEach(async () => {
  await Blog.deleteMany({})  

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})



test('all blogs are returned in JSON', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body.length).toBe(helper.initialBlogs.length)

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})



test('IDs are defined', async () => {
  const response = await api.get('/api/blogs')

  response.body.map(post => {
    expect(post.id).toBeDefined()
  }) 

})



test('create new blog post', async () => {
  const newBlog = {
    title: 'Hello World',
    author: 'divpusher',
    url: 'https://divpusher.com',
    likes: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()  
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length + 1)


  const contents = blogsAtEnd.map(n => n.title)  
  expect(contents).toContain('Hello World')
})



test('missing likes will default to 0', async () => {
    const newBlog = {
    title: 'Hello World',
    author: 'divpusher',
    url: 'https://divpusher.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


  const blogsAtEnd = await helper.blogsInDb()
  const lastBlog = blogsAtEnd[blogsAtEnd.length-1]
  expect(lastBlog.likes).toBe(0)
})



test('missing title/url property is a bad request', async () => {
  let newBlog = {
    title: 'Hello World',
    author: 'divpusher'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)


  newBlog = {    
    author: 'divpusher',
    url: 'https://divpusher.com'
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})



test('delete a post', async () => {
  let blogsAtEnd = await helper.blogsInDb()
  const firstPostId = blogsAtEnd[0].id

  await api
    .delete('/api/blogs/'+firstPostId)
    .expect(204)


  blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd.length).toBe(helper.initialBlogs.length-1)
})



afterAll(() => {
  mongoose.connection.close()
})