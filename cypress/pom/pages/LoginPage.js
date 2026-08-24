import * as locators from '../locators/login.locators'

class LoginPage {
  // ── Elements ──────────────────────────────────────────
  elements = {
    userName : () => cy.get(locators.userName_Field),
    password : () => cy.get(locators.password_Field),
    loginBtn : () => cy.get(locators.login_Button),
    errorMessage: () => cy.get(locators.error_Message),
  }

  // ── Actions ───────────────────────────────────────────
  visit() {
    cy.visit('/')
  }

  typeUserName(username) {
    this.elements.userName().type(username)
  }

  typePassword(password) {
    this.elements.password().type(password)
  }

  clickLogin() {
    this.elements.loginBtn().click()
  }
  
  getErrorMessage() {
    return this.elements.errorMessage()
  }
}

export default new LoginPage()