import React, { useState } from 'react'


const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')


  if (!props.show) {
    return null
  }

  if (props.authors.loading) {
    return <div>loading...</div>
  }


  const submit = async (e) => {
    e.preventDefault()

    await props.editAuthor({
      variables: {
        name,
        setBornTo: parseInt(born)
      }
    })

    setName('')
    setBorn('')
  }


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {props.authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select
            value={name}
            onChange={({ target }) => setName(target.value)}
          >{props.authors.data.allAuthors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}</select>
        </div>
        <div>
          born
          <input
            value={born}
            onChange={({ target }) => setBorn(target.value)}
           />
        </div>
        <button type='submit'>update author</button>
      </form>

    </div>
  )
}

export default Authors