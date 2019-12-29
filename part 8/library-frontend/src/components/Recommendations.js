import React, { useState, useEffect } from 'react'
import { gql } from 'apollo-boost'



const CURRENT_USER = gql`
{
  me{
    username
    favoriteGenre
  }
}
`


const ALL_BOOKS_BY_GENRE = gql`
query allBooks($genre: String!){
  allBooks(genre: $genre) {
    title
    published
    author{
      name
    }
  }
}
`


const Recommendations = ({ client }) => {

  const [booksByGenre, setBooksByGenre] = useState(null)
  const [favGenre, setFavGenre] = useState('-')

  useEffect(() => {

    const fetchData = async () => {
      const user = await client.query({
        query: CURRENT_USER,
        fetchPolicy: 'no-cache'
      });
      setFavGenre(user.data.me.favoriteGenre)

      const books = await client.query({
        query: ALL_BOOKS_BY_GENRE,
        variables: { genre: favGenre }
      });
      setBooksByGenre(books.data.allBooks)
    }

    fetchData()

  }, [client, favGenre])



  if (!booksByGenre){
    return (
      <div>Loading...</div>
    )
  }


  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: <b>{favGenre}</b></p>
      <p>&nbsp;</p>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {booksByGenre.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}


export default Recommendations