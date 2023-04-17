import { test, request } from "@playwright/test";
import { DashboardPage } from "../modules/DashboardPage";
import { APIUtils } from "../utils/APIUtils";
import { loginRequestPayload, orderRequestPayload } from "../utils/Payloads";

interface Response {
  [key: string]: string;
}

const response: Response = {};

test.beforeAll(async () => {
  const apiContext = await request.newContext();

  //! Login API
  const apiUtils = new APIUtils(apiContext, loginRequestPayload);
  response.token = await apiUtils.getToken();

  //! Create Order API
  const orderResponse = await apiUtils.createOrder(orderRequestPayload, response.token);
  response.orders = orderResponse.orders;
});

test("Buy an item flow", async ({ page }) => {
  // Add token to Local Storage
  await page.addInitScript((e: string) => {
    window.localStorage.setItem("token", e);
  }, response.token);

  // Navigate directly to Dashboard > Checkout section
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navigate();
  const checkoutPage = await dashboardPage.navigateToOrders();

  // Check if new order is in the orders list
  const [orderId] = response.orders;
  await checkoutPage.check.itemIsInOrders(orderId);
});
