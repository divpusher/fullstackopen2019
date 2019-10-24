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


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}