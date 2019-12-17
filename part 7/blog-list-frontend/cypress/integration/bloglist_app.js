describe('Bloglist app', function() {

  it('front page works', function() {
    cy.visit('http://localhost:3000')
    cy.contains('Log in to Application')
  })

})



describe('after logged in', function() {

  before(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    const user = {
      name: 'Test User',
      username: 'test',
      password: '12345'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
  })



  it('user can log in and log out', function() {
    cy.get('[data-cy=username]')
      .type('test')
    cy.get('[data-cy=password]')
      .type('12345')
    cy.get('[data-cy=login]')
      .click()

    cy.contains('Test User is logged in')

    cy.get('[data-cy=logout]')
      .click()
    cy.contains('Log in to Application')
  })



  it('user can add a blog, can like, can comment', function() {
    cy.get('[data-cy=username]')
      .type('test')
    cy.get('[data-cy=password]')
      .type('12345')
    cy.get('[data-cy=login]')
      .click()

    cy.contains('create new').click()
    cy.get('[data-cy=title]')
      .type('Test blog title')
    cy.get('[data-cy=author]')
      .type('Test Author')
    cy.get('[data-cy=url]')
      .type('http://testurl.com')
    cy.get('[data-cy=submit]')
      .click()

    cy.contains('Test blog title from Test Author')
      .click()
    cy.contains('Test blog title by Test Author')
    cy.contains('0 likes')


    cy.get('[data-cy=like]')
      .click()
    cy.contains('1 likes')


    cy.get('[data-cy=comment]')
      .type('demo comment')
    cy.get('[data-cy=submit]')
      .click()
    cy.contains('demo comment')

  })


})

