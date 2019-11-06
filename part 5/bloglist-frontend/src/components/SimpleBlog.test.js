import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'



test('renders content', () => {

  const blog = {
    title: 'My blog title',
    author: 'Blog author',
    likes: 9
  }


  const component = render(
    <SimpleBlog blog={blog} />
  )


  expect(component.container).toHaveTextContent(
    'My blog title'
  )

  expect(component.container).toHaveTextContent(
    'Blog author'
  )

  expect(component.container).toHaveTextContent(
    '9 likes'
  )

})