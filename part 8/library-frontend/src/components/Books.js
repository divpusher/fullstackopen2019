import React, { useState } from 'react'
import { gql } from 'apollo-boost'



const BOOKS_BY_GENRE = gql`
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



const Books = (props) => {

  const [genre, setGenre] = useState(null)
  const [booksByGenre, setBooksByGenre] = useState(null)


  if (!props.show) {
    return null
  }


  let filterList = new Set()
  props.books.data.allBooks.forEach(b => {
    b.genres.forEach(
      g => filterList.add(g)
    )
  })



  const bookByGenre = async (g) => {

    setGenre(g)

    const result = await props.client.query({
      query: BOOKS_BY_GENRE,
      variables: { genre: g },
      fetchPolicy: 'no-cache'
    })

    setBooksByGenre(result.data.allBooks)

  }


  if (booksByGenre){
    return (
      <div>
        <h2>books</h2>
        <p>in genre: <b>{genre}</b></p>

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

        <p>&nbsp;</p>
        <div>
        {[...filterList].map(f =>
          <button key={f} onClick={() => bookByGenre(f)}>{f}</button>
        )}
          <button onClick={() => setBooksByGenre(null)}>all genres</button>
        </div>
      </div>
    )
  }


  return (
    <div>
      <h2>books</h2>

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
          {props.books.data.allBooks.map(b =>
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          )}
        </tbody>
      </table>

      <p>&nbsp;</p>
      <div>
      {[...filterList].map(f =>
        <button key={f} onClick={() => bookByGenre(f)}>{f}</button>
      )}
        <button onClick={() => bookByGenre(null)}>all genres</button>
      </div>


    </div>
  )
}

export default Books