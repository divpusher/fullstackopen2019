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


let authors = []


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
    bookCount: () => books.length,
    authorCount: () => authors.length,
    allBooks: (root, args) => {
      if (!args.author && !args.genre){
        return Book.find({})
      }

      let filteredBooks = Book.find({})

      if (args.author){
        filteredBooks = filteredBooks.filter(b => b.author === args.author)
      }

      if (args.genre){
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }

      return filteredBooks
    },
    allAuthors: () => Author.find({})
  },

  Author: {
    bookCount: (root) => {
      const authorBooks = books.filter(b => b.author === root.name)
      return authorBooks.length
    }
  },

  Mutation: {
    addBook: async (root, args, context) => {
      const author = new Author({
        name: args.author
      })
      await author.save()

      const book = new Book({
        ...args,
        author: author
      })
      await book.save()

      // try {
        // return book.save()
      // } catch (error) {
        // throw new UserInputError(error.message, {
          // invalidArgs: args,
        // })
      // }

      return book
    },

    editAuthor: (root, args) => {
      const authorToEdit = authors.find(a => a.name === args.name)
      if (!authorToEdit){
        return null
      }

      const updatedAuthor = {
        ...authorToEdit,
        born: args.setBornTo
      }

      authors = authors.map(a => a.name === args.name ? updatedAuthor : a)
      return updatedAuthor
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
