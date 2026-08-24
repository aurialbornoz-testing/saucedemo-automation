import loginPage from '../pom/pages/LoginPage'

describe('Login page', () => {
  beforeEach(() => {
    // Navigate to the login page before each test
    loginPage.visit()
  })

  it('should log in with valid credentials', () => {
    loginPage.typeUserName('standard_user')
    loginPage.typePassword('secret_sauce')
    loginPage.clickLogin()

    // Assert: we should land on the inventory page
    cy.url().should('include', '/inventory.html')
  })

  it('should show an error for a locked out user', () => {
    loginPage.typeUserName('locked_out_user')
    loginPage.typePassword('secret_sauce')
    loginPage.clickLogin()

    // Assert: the error message should be visible with the correct text
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Sorry, this user has been locked out.')
  })
  
  it('should show an error for an incorrect password', () => {
    loginPage.typeUserName('standard_user')
    loginPage.typePassword('wrong_password')
    loginPage.clickLogin()

    // Assert: the error message should be visible with the correct text
    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Username and password do not match any user in this service')
  })

  it('should show an error when username is empty', () => {
    loginPage.typePassword('secret_sauce')
    loginPage.clickLogin()

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Username is required')
  })

  it('should show an error when password is empty', () => {
    loginPage.typeUserName('standard_user')
    loginPage.clickLogin()

    loginPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Password is required')
  })
})