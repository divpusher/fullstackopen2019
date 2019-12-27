require('dotenv').config()
const { ApolloServer, UserInputError, gql } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Author = require('./models/author')
const Book = require('./models/book')



let MONGODB_URI = process.env.MONGODB_URI
console.log('connecting to', MONGODB_URI)

mongoose.set('useFindAndModify', false)
mongoose.set('useNewUrlParser', true)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true);

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })



const typeDefs = gql`

  type Author{
    name: String!
    born: Int
    id: ID!
    bookCount: Int!
  }

  type Book{
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

  }

`

const resolvers = {
  Query: {
    bookCount: () => Book.countDocuments({}),
    authorCount: () => Author.countDocuments({}),
    allBooks: (root, args) => {
      if (!args.author && !args.genre){
        return Book.find({})
      }

      if (args.author){
        return Book.find({ author: args.author })
      }

      if (args.genre){
        return Book.find({
          genres: { $in: args.genre }
        })
      }
    },
    allAuthors: () => Author.find({})
  },

  Author: {
    bookCount: (root) => {
      return Book.find({
        author: mongoose.Types.ObjectId(root.id)
      }).countDocuments()
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {

      // check if author exists
      let author = await Author.findOne({ name: args.author })
      if (!author){
        author = new Author({
          name: args.author,
          born: null
        })
        await author.save()
      }

      const book = new Book({
        ...args,
        author: author
      })

      try {
        await book.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        })
      }

      return book
    },

    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name })
      if (!author){
        return null
      }

      author.born = args.setBornTo
      await author.save()
      return author
    }
  }
}



const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
