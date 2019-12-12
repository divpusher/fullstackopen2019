const commentsRouter = require('express').Router()
const Comment = require('../models/comment')



commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})

  response.json(comments.map(c => c.toJSON()))
})


module.exports = commentsRouter