import { Page, expect } from "@playwright/test";
import { CheckoutLocator } from "./CheckoutLocator";

export class CheckoutChecker {
  readonly page: Page;
  readonly locate: CheckoutLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new CheckoutLocator(this.page);
  }

  async confirmationMessage() {
    expect(await this.locate.confirmationMessage.textContent()).toBe(" Thankyou for the order. ");
  }

  async itemIsInOrders(itemId: string) {
    const matchingId = await this.locate.ordersTable.getByText(itemId).textContent();
    expect(itemId).toBe(matchingId);
  }
}
