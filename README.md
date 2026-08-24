# SauceDemo Automation

Automated end-to-end test suite for [SauceDemo]([https://www.saucedemo.com](https://www.saucedemo.com)), built with **Cypress** using the **Page Object Model (POM)** design pattern.

## 🧰 Tech Stack

- [Cypress]([https://www.cypress.io/](https://www.cypress.io/)) — E2E testing framework

- JavaScript (ES6+)

- Page Object Model architecture

## 📁 Project Structure

saucedemo-automation/  
├── cypress/  
│ ├── e2e/ # Test specs  
│ │ ├── [login.cy](http://login.cy).js  
│ │ ├── [inventory.cy](http://inventory.cy).js  
│ │ ├── [checkout.cy](http://checkout.cy).js  
│ │ └── [navigation.cy](http://navigation.cy).js  
│ └── pom/  
│ ├── locators/ # CSS selectors per page  
│ │ ├── login.locators.js  
│ │ ├── inventory.locators.js  
│ │ └── checkout.locators.js  
│ └── pages/ # Page Object classes  
│ ├── LoginPage.js  
│ ├── InventoryPage.js  
│ └── CheckoutPage.js  
├── cypress.config.js  
└── package.json



## ✅ Test Coverage (21 tests)

### Login (5 tests)

- Successful login with valid credentials

- Locked out user error

- Incorrect password error

- Empty username validation

- Empty password validation

### Inventory (7 tests)

- Products page title and product count

- Add to cart / cart badge updates

- Sort products by price (low to high)

- Sort products by name (Z to A)

- Verify specific product content (name, price, description)

- Add multiple products and remove one

### Checkout (8 tests)

- Full purchase flow (login → cart → checkout → confirmation)

- Empty First Name / Last Name / Postal Code validation

- Cancel from Step One (returns to cart)

- Cancel from Step Two (returns to inventory)

- Continue Shopping preserves cart contents

- Subtotal + Tax = Total calculation check

### Navigation / Security (1 test)

- Direct URL access to `/inventory.html` without login is blocked

## 🚀 Getting Started

### Prerequisites

- [Node.js]([https://nodejs.org/](https://nodejs.org/)) v18+

### Installation

```bash

npm install

```

### Running the tests

**Interactive mode (Cypress UI):**

```bash

npx cypress open

```

**Headless mode (CI-friendly):**

```bash

npx cypress run

```

## 🏗️ Architecture Notes

- **Page Object Model:** each page has a `locators` file (CSS selectors only) and a `pages` file (a class exposing elements and reusable actions). Test files never call `cy.get()` directly.

- **Data-test attributes:** all locators prioritize `data-test` attributes over IDs or CSS classes for stability.

- **Test isolation:** each test starts from a clean state (fresh login) to avoid dependencies between tests.

## 📌 Known Notes

- `cy.type('')` cannot accept an empty string in Cypress — `fillCustomerInfo()` conditionally skips fields with no value to simulate empty form submissions.

- The "Cancel" button behaves differently depending on the checkout step: Step One returns to `/cart.html`, while Step Two returns to `/inventory.html`.