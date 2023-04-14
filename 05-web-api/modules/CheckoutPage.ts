import { Page } from "@playwright/test";
import { CheckoutLocator } from "./CheckoutLocator";
import { CheckoutChecker } from "./CheckoutChecker";

export class CheckoutPage {
  readonly page: Page;
  readonly locate: CheckoutLocator;
  readonly check: CheckoutChecker;

  constructor(page: Page) {
    this.page = page;
    this.locate = new CheckoutLocator(this.page);
    this.check = new CheckoutChecker(this.page);
  }

  async fillShippingInfo(shippingEmail: string, shippingCountry: string) {
    await this.locate.email.fill(shippingEmail);
    await this.locate.country.type(`${shippingCountry.slice(0, 2)}`, { delay: 100 });
    await this.locate.countryDropdown.waitFor();
    const options = await this.locate.countryOptions.all();
    for (const country of options) {
      const countryName = await country.textContent();
      if (countryName?.slice(1) === shippingCountry) {
        await country.click();
        break;
      }
    }
  }

  async navigateToOrders() {
    await this.page.goto("https://rahulshettyacademy.com/client/dashboard/myorders");
  }

  async submitCheckoutForm() {
    await this.locate.submitButton.click();
  }

  async getOrderId() {
    const text = await this.locate.confirmationOrderId.textContent();
    if (text) return text?.split(" | ")[1];
    else throw new Error("Order id not found");
  }

  async getAllOrderIds() {}
}
