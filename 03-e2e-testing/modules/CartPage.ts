import { Page } from "@playwright/test";
import { CartLocator } from "./CartLocator";
import { CartChecker } from "./CartChecker";
import { CheckoutPage } from "./CheckoutPage";

export class CartPage {
  page: Page;
  locate: CartLocator;
  check: CartChecker;

  constructor(page: Page) {
    this.page = page;
    this.locate = new CartLocator(page);
    this.check = new CartChecker(page);
  }

  async getLastItemName() {
    const name = await this.locate.lastItemTitle.textContent();
    if (name) return name;
    else throw new Error("No LastItem name found.");
  }

  async navigateToCheckout() {
    await this.locate.checkoutButton.click();
    await this.page.waitForLoadState("networkidle");
    return new CheckoutPage(this.page);
  }
}
