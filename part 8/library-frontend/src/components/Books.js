import React, { useState } from 'react'


const Books = (props) => {
  const [genre, setGenre] = useState(null)


  if (!props.show) {
    return null
  }

  if (props.books.loading) {
    return <div>loading...</div>
  }


  let filterList = new Set()
  props.books.data.allBooks.forEach(b => {
    b.genres.forEach(
      g => filterList.add(g)
    )
  })


  let bookList = props.books.data.allBooks
  if (genre){
    bookList = bookList.filter(b =>
      b.genres.includes(genre)
    )
  }



  return (
    <div>
      <h2>books</h2>
      {genre &&
        <p>in genre: <b>{genre}</b></p>
      }

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
          {bookList.map(b =>
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
        <button key={f} onClick={() => setGenre(f)}>{f}</button>
      )}
        <button onClick={() => setGenre(null)}>all genres</button>
      </div>


    </div>
  )
}

export default Books