import * as locators from '../locators/inventory.locators'

class InventoryPage {
  // ── Elements ──────────────────────────────────────────
  elements = {
    pageTitle         : () => cy.get(locators.pageTitle),
    shoppingCartLink  : () => cy.get(locators.shoppingCartLink),
    shoppingCartBadge : () => cy.get(locators.shoppingCartBadge),
    productSortDropdown: () => cy.get(locators.productSortDropdown),
    inventoryItems    : () => cy.get(locators.inventoryItem),
    inventoryNames : () => cy.get(locators.inventoryItemName),
    inventoryPrices : () => cy.get(locators.inventoryItemPrice),
    inventoryDescriptions : () => cy.get(locators.inventoryItemDescription),
    addToCartBtn      : (productSlug) => cy.get(locators.addToCartButton(productSlug)),
    removeFromCartBtn : (productSlug) => cy.get(locators.removeFromCartButton(productSlug)),
  }

  // ── Actions ───────────────────────────────────────────
  getPageTitle() {
    return this.elements.pageTitle()
  }

  addProductToCart(productSlug) {
    this.elements.addToCartBtn(productSlug).click()
  }

  openCart() {
    this.elements.shoppingCartLink().click()
  }

  getCartBadgeCount() {
    return this.elements.shoppingCartBadge()
  }

  sortProductsBy(optionValue) {
    this.elements.productSortDropdown().select(optionValue)
  }

  getAllProducts() {
    return this.elements.inventoryItems()
  }

  getAllProductNames() {
    return this.elements.inventoryNames()
  }

  getAllPrices() {
    return this.elements.inventoryPrices()
  }

  getAllDescriptions() {
    return this.elements.inventoryDescriptions()
  }

  removeProductFromCart(productSlug) {
    this.elements.removeFromCartBtn(productSlug).click()
  }
}

export default new InventoryPage()