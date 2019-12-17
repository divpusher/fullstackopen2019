describe('Bloglist app', function() {

  it('front page works', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to Application')
  })

})



describe('after logged in', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.get('[data-cy=username]')
      .type('test')
    cy.get('[data-cy=password]')
      .type('12345')
    cy.get('[data-cy=login]')
      .click()
  })



  it('user can log in and log out', function() {
    cy.contains('Test User is logged in')

    cy.get('[data-cy=logout]')
      .click()
    cy.contains('Log in to Application')
  })



  it('user can add a blog', function() {
    cy.contains('create new').click()
    cy.get('[data-cy=title]')
      .type('Test blog title')
    cy.get('[data-cy=author]')
      .type('Test Author')
    cy.get('[data-cy=url]')
      .type('http://testurl.com')
    cy.get('[data-cy=submit]')
      .click()

    // blog is visible
    cy.contains('Test blog title from Test Author')
  })


})

