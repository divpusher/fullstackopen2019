import React from 'react'
import { render, waitForElement } from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'


describe('<App />', () => {

  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )


    // expectations here
    expect(component.container).toHaveTextContent('username')
    expect(component.container).toHaveTextContent('password')

    expect(component.container.querySelector('.title')).toBe(null)

    expect(component.container).not.toHaveTextContent('React patterns')
  })



  test('posts are rendered for logged in user', async () => {

    const user = {
      username: 'tester',
      token: '1231231214',
      name: 'Donald Tester'
    }

    localStorage.setItem('loggedBloglistUser', JSON.stringify(user))


    const component = render(
      <App />
    )

    component.rerender(<App />)


    await waitForElement(
      () => component.container.querySelector('.details')
    )


    expect(component.container).toHaveTextContent('logged in')

    expect(component.container).toHaveTextContent('React patterns')
    expect(component.container).toHaveTextContent('Type wars')

  })

})