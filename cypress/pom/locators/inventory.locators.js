export const pageTitle = '[data-test="title"]'
export const shoppingCartLink = '[data-test="shopping-cart-link"]'
export const shoppingCartBadge = '[data-test="shopping-cart-badge"]'
export const productSortDropdown = '[data-test="product-sort-container"]'
export const inventoryContainer = '[data-test="inventory-container"]'
export const inventoryList = '[data-test="inventory-list"]'
export const inventoryItem = '[data-test="inventory-item"]'
export const inventoryItemName = '[data-test="inventory-item-name"]'
export const inventoryItemPrice = '[data-test="inventory-item-price"]'
export const inventoryItemDescription = '[data-test="inventory-item-description"]'
export const addToCartButton = (productSlug) => `[data-test="add-to-cart-${productSlug}"]`
export const removeFromCartButton = (productSlug) => `[data-test="remove-${productSlug}"]`