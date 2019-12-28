import React from 'react'


const Recommendations = (props) => {

  if (!props.show) {
    return null
  }

  let bookList = props.books.data.allBooks.filter(b =>
    b.genres.includes(props.currentUser.data.me.favoriteGenre)
  )

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre: <b>{props.currentUser.data.me.favoriteGenre}</b></p>
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
          {bookList.map(b =>
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