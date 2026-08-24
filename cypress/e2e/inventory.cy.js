import loginPage from '../pom/pages/LoginPage'
import inventoryPage from '../pom/pages/InventoryPage'

describe('Inventory page', () => {
  beforeEach(() => {
    // Log in before every inventory test
    loginPage.visit()
    loginPage.typeUserName('standard_user')
    loginPage.typePassword('secret_sauce')
    loginPage.clickLogin()
  })

  it('should display the Products title', () => {
    inventoryPage.getPageTitle().should('contain.text', 'Products')
  })

  it('should display 6 products', () => {
    inventoryPage.getAllProducts().should('have.length', 6)
  })

  it('should add a product to the cart and update the badge', () => {
    inventoryPage.addProductToCart('sauce-labs-backpack')
    inventoryPage.getCartBadgeCount().should('contain.text', '1')
  })

  it('should sort products by price low to high', () => {
    inventoryPage.sortProductsBy('lohi')

    inventoryPage.getAllPrices().then(($prices) => {
      // Convert each price element's text (e.g. "$9.99") into a number
      const prices = [...$prices].map((el) => parseFloat(el.innerText.replace('$', '')))

      // Create a sorted copy to compare against
      const sortedPrices = [...prices].sort((a, b) => a - b)

      expect(prices).to.deep.equal(sortedPrices)
    })
  })

  it('should sort products by name Z to A', () => {
    inventoryPage.sortProductsBy('za')

    inventoryPage.getAllProductNames().then(($names) => {
      // Convert each name element's text into a plain array of strings
      const names = [...$names].map((el) => el.innerText)

      // Create a sorted (descending alphabetical) copy to compare against
      const sortedNames = [...names].sort().reverse()

      expect(names).to.deep.equal(sortedNames)
    })
  })

  it('should display correct info for the Sauce Labs Backpack', () => {
    inventoryPage.getAllProductNames().first()
      .should('have.text', 'Sauce Labs Backpack')

    inventoryPage.getAllPrices().first()
      .should('have.text', '$29.99')

    inventoryPage.getAllDescriptions().first()
      .should('contain.text', 'carry.allTheThings()')
  })

  it('should add multiple products and remove one, updating the badge', () => {
    inventoryPage.addProductToCart('sauce-labs-backpack')
    inventoryPage.addProductToCart('sauce-labs-bike-light')
    inventoryPage.addProductToCart('sauce-labs-bolt-t-shirt')

    // Confirm all 3 were added
    inventoryPage.getCartBadgeCount().should('contain.text', '3')

    // Remove one product
    inventoryPage.removeProductFromCart('sauce-labs-bike-light')

    // Confirm the badge updated to 2
    inventoryPage.getCartBadgeCount().should('contain.text', '2')
  })
})