import { APIRequestContext, expect } from "@playwright/test";

interface LoginRequestPayload {
  userEmail: string;
  userPassword: string;
}

interface OrderItem {
  country: string;
  productOrderedId: string;
}

interface OrderRequestPayload {
  orders: OrderItem[];
}

export class APIUtils {
  readonly apiContext: APIRequestContext;
  readonly loginPayload: LoginRequestPayload;

  constructor(apiContext: APIRequestContext, loginPayload: LoginRequestPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async getToken() {
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      { data: this.loginPayload }
    );
    expect(loginResponse.ok()).toBeTruthy(); // Expect any 2** status code
    const loginResponseJson = await loginResponse.json();
    return loginResponseJson.token;
  }

  async createOrder(orderRequestPayload: OrderRequestPayload, token?: string) {
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderRequestPayload,
        headers: {
          Authorization: token ? token : await this.getToken(),
          "Content-Type": "application/json",
        },
      }
    );
    expect(orderResponse.ok()).toBeTruthy();
    const orderResponseJson = await orderResponse.json();
    return orderResponseJson;
  }
}
