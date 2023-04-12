import { test } from "@playwright/test";
import { LoginPage } from "../modules/LoginPage";

test("Buy an item flow", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  // Login
  const dashboardPage = await loginPage.login("rgarcia@makingsense.com", "Qwerty123");
  await dashboardPage.page.waitForLoadState("networkidle");
  // Add item to cart
  const addedItem = await dashboardPage.addItemToCart("ZARA COAT 3");
  // Navigate to cart
  const cartPage = await dashboardPage.navigateToCart();
  // Check if item was added to the cart
  const cartItem = cartPage.locate.itemByTitle(addedItem.title);
  await cartPage.check.cartItemAdded(cartItem);
  // Go to checkout
  const checkoutPage = await cartPage.navigateToCheckout();
  // Fill and submit shipping information
  await checkoutPage.fillShippingInfo("rgarcia@makingsense.com", "Argentina");
  await checkoutPage.submitCheckoutForm();
  // Check successful submission
  await checkoutPage.check.confirmationMessage();
  // Get new order id
  const newOderId = await checkoutPage.getOrderId();
  // Navigate to Orders (too lazy to do it the DOM way)
  await checkoutPage.locate.orders.click();
  await checkoutPage.locate.ordersTable.waitFor();
  // Check if new order is in the orders list
  await checkoutPage.check.itemIsInOrders(newOderId);
});
