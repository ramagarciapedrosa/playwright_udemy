import { test, request, expect } from "@playwright/test";
import { DashboardPage } from "../modules/DashboardPage";
import { CheckoutPage } from "../modules/CheckoutPage";

let loginToken: string;
let orderIds: string[];

test.beforeAll(async () => {
  // Login API
  const loginRequestPayload = {
    userEmail: "rgarcia@makingsense.com",
    userPassword: "Qwerty123",
  };
  const apiContext = await request.newContext();
  const loginResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/auth/login",
    { data: loginRequestPayload }
  );
  expect(loginResponse.ok()).toBeTruthy(); // Expect any 2** status code
  const loginResponseJson = await loginResponse.json();
  loginToken = loginResponseJson.token;

  // Create order API
  const orderRequestPayload = {
    orders: [
      {
        country: "Argentina",
        productOrderedId: "6262e95ae26b7e1a10e89bf0",
      },
    ],
  };
  const orderResponse = await apiContext.post(
    "https://rahulshettyacademy.com/api/ecom/order/create-order",
    {
      data: orderRequestPayload,
      headers: {
        Authorization: loginToken,
        "Content-Type": "application/json",
      },
    }
  );
  expect(orderResponse.ok()).toBeTruthy();
  const orderResponseJson = await orderResponse.json();
  orderIds = orderResponseJson.orders;
});

test("Buy an item flow", async ({ page }) => {
  // Add token to Local Storage
  await page.addInitScript((e: string) => {
    window.localStorage.setItem("token", e);
  }, loginToken);

  // Navigate directly to Dashboard > Checkout section
  const dashboardPage = new DashboardPage(page);
  await dashboardPage.navigate();
  const checkoutPage = await dashboardPage.navigateToOrders();

  // Check if new order is in the orders list
  const [orderId] = orderIds;
  await checkoutPage.check.itemIsInOrders(orderId);
});
