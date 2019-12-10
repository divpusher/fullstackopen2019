import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'



let blog, component, mockHandler

beforeEach(() => {
  blog = {
    title: 'Test blog',
    author: 'Mr X',
    url: 'divpusher.com',
    likes: 4,
    id: '12346asd',
    user: {
      username: 'root',
      name: 'superuser',
      id: '987654qwe'
    }
  }

  mockHandler = jest.fn()

  component = render(
    <Blog
      handleLikeBlog={mockHandler}
      handleRemoveBlog={mockHandler}
      blog={blog}
    />
  )
})



test('only name and author are shown by default', () => {

  const div = component.container.querySelector('.details')
  expect(div).toHaveStyle('display: none')

})



test('blog details are visible after click on blog', () => {

  const button = component.container.querySelector('.title')
  fireEvent.click(button)

  expect(component.container.querySelector('.details')).toBeVisible()

})