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

})