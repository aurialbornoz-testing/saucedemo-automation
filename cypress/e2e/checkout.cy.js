import loginPage from '../pom/pages/LoginPage'
import inventoryPage from '../pom/pages/InventoryPage'
import checkoutPage from '../pom/pages/CheckoutPage'

describe('Checkout flow', () => {
  beforeEach(() => {
    // Log in and add a product to the cart before every checkout test
    loginPage.visit()
    loginPage.typeUserName('standard_user')
    loginPage.typePassword('secret_sauce')
    loginPage.clickLogin()

    inventoryPage.addProductToCart('sauce-labs-backpack')
    inventoryPage.openCart()
  })

  it('should complete a purchase successfully', () => {
    checkoutPage.goToCheckout()

    checkoutPage.fillCustomerInfo('John', 'Doe', '12345')
    checkoutPage.continueToOverview()

    // Verify the total is displayed before finishing
    checkoutPage.getTotal().should('be.visible')

    checkoutPage.finishCheckout()

    // Verify the confirmation screen
    checkoutPage.getCompleteHeader().should('contain.text', 'Thank you for your order!')
  })

  it('should calculate the total correctly (subtotal + tax)', () => {
    checkoutPage.goToCheckout()
    checkoutPage.fillCustomerInfo('John', 'Doe', '12345')
    checkoutPage.continueToOverview()

    checkoutPage.getSubtotal().invoke('text').then((subtotalText) => {
      checkoutPage.getTax().invoke('text').then((taxText) => {
        checkoutPage.getTotal().invoke('text').then((totalText) => {
          // Extract just the numbers from each label
          const subtotal = parseFloat(subtotalText.replace('Item total: $', ''))
          const tax = parseFloat(taxText.replace('Tax: $', ''))
          const total = parseFloat(totalText.replace('Total: $', ''))

          // Verify the math: subtotal + tax should equal total (rounded to 2 decimals)
          expect(Math.round((subtotal + tax) * 100) / 100).to.equal(total)
        })
      })
    })
  })

  it('should show an error when First Name is empty', () => {
    checkoutPage.goToCheckout()
    checkoutPage.fillCustomerInfo('', 'Doe', '12345')
    checkoutPage.continueToOverview()

    checkoutPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'First Name is required')
  })

  it('should show an error when Last Name is empty', () => {
    checkoutPage.goToCheckout()
    checkoutPage.fillCustomerInfo('John', '', '12345')
    checkoutPage.continueToOverview()

    checkoutPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Last Name is required')
  })

  it('should show an error when Postal Code is empty', () => {
    checkoutPage.goToCheckout()
    checkoutPage.fillCustomerInfo('John', 'Doe', '')
    checkoutPage.continueToOverview()

    checkoutPage.getErrorMessage()
      .should('be.visible')
      .and('contain.text', 'Postal Code is required')
  })

  it('should return to the cart when canceling from Step One', () => {
    checkoutPage.goToCheckout()
    checkoutPage.cancelCheckout()
  
    cy.url().should('include', '/cart.html')
  })
  
  it('should return to inventory when canceling from Step Two', () => {
    checkoutPage.goToCheckout()
    checkoutPage.fillCustomerInfo('John', 'Doe', '12345')
    checkoutPage.continueToOverview()
    checkoutPage.cancelCheckout()
  
    cy.url().should('include', '/inventory.html')
  })

  it('should return to inventory and keep the product in cart', () => {
    // We're already on the cart page thanks to beforeEach
    checkoutPage.continueShopping()

    // Confirm we're back on the inventory page
    cy.url().should('include', '/inventory.html')

    // Confirm the product is still in the cart
    inventoryPage.getCartBadgeCount().should('contain.text', '1')
  })
})