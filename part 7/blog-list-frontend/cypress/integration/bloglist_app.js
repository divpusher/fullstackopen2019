describe('Bloglist app', function() {

  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })


  it('front page works, need to log in', function() {
    cy.contains('Log in to Application')
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

})

