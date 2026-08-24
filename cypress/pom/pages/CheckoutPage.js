import * as locators from '../locators/checkout.locators'

class CheckoutPage {
  // ── Elements ──────────────────────────────────────────
  elements = {
    checkoutBtn        : () => cy.get(locators.checkoutButton),
    continueShoppingBtn : () => cy.get(locators.continueShoppingButton),

    firstNameField  : () => cy.get(locators.firstNameField),
    lastNameField   : () => cy.get(locators.lastNameField),
    postalCodeField : () => cy.get(locators.postalCodeField),
    continueBtn     : () => cy.get(locators.continueButton),
    errorMessage    : () => cy.get(locators.errorMessage),
    cancelBtn : () => cy.get(locators.cancelButton),

    subtotalLabel : () => cy.get(locators.subtotalLabel),
    taxLabel      : () => cy.get(locators.taxLabel),
    totalLabel    : () => cy.get(locators.totalLabel),
    finishBtn     : () => cy.get(locators.finishButton),

    completeHeader  : () => cy.get(locators.completeHeader),
    completeText    : () => cy.get(locators.completeText),
    backHomeBtn     : () => cy.get(locators.backHomeButton),
  }

  // ── Actions ───────────────────────────────────────────
  goToCheckout() {
    this.elements.checkoutBtn().click()
  }

  fillCustomerInfo(firstName, lastName, postalCode) {
    if (firstName) this.elements.firstNameField().type(firstName)
    if (lastName) this.elements.lastNameField().type(lastName)
    if (postalCode) this.elements.postalCodeField().type(postalCode)
  }

  continueToOverview() {
    this.elements.continueBtn().click()
  }

  getTotal() {
    return this.elements.totalLabel()
  }
  
  getSubtotal() {
    return this.elements.subtotalLabel()
  }

  getTax() {
    return this.elements.taxLabel()
  }

  finishCheckout() {
    this.elements.finishBtn().click()
  }

  getCompleteHeader() {
    return this.elements.completeHeader()
  }

  getErrorMessage() {
    return this.elements.errorMessage()
  }

  cancelCheckout() {
    this.elements.cancelBtn().click()
  }

  continueShopping() {
    this.elements.continueShoppingBtn().click()
  }
}

export default new CheckoutPage()