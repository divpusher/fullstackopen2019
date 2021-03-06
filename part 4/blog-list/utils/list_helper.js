var _ = require('lodash');



const dummy = (blogs) => {
  return 1
}



const totalLikes = (blogs) => {
  const reducer = (sum, post) => {
    return sum + post.likes
  }

  return blogs.reduce(reducer, 0)
}



const favoriteBlog = (blogs) => {
  const top = blogs.reduce(
    (prev, current) => (prev.likes > current.likes) ? prev : current
  )

  return top
}



const mostBlogs = (blogs) => {
  const filtered = _.countBy(blogs, 'author')
  let arr = new Array()
  for (let [key, value] of Object.entries(filtered)) {
    arr.push({
      author: key,
      blogs: value
    })
  }

  return arr.reduce(function(prev, current) {
    return (prev.blogs > current.blogs) ? prev : current
  })
}



const mostLikes = (blogs) => {
  const authors = _.groupBy(blogs, 'author')
  let result = { author: '', likes: 0 }
  let likes

  for (let [key, value] of Object.entries(authors)) {
    likes = value.reduce((sum, item) => sum + item.likes, 0)
    if(likes > result.likes){
      result.author = key
      result.likes = likes    
    }
  }

  return result
}



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}