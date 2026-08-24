import loginPage from '../pom/pages/LoginPage'

describe('Route protection', () => {
  it('should not allow direct access to inventory without logging in', () => {
    cy.visit('/inventory.html', { failOnStatusCode: false })

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', "You can only access '/inventory.html' when you are logged in")
  })
})