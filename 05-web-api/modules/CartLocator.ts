import { Page, Locator } from "@playwright/test";
import { HeaderLocator } from "./_HeaderLocator";

export class CartLocator extends HeaderLocator {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly lastItem: Locator;
  readonly lastItemTitle: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.cartItems = page.locator(".cart");
    this.lastItem = this.cartItems.last();
    this.lastItemTitle = this.lastItem.locator("h3");
    this.checkoutButton = page.getByRole("button", { name: "Checkout" });
  }

  itemByTitle(title: string) {
    const item = this.cartItems.locator(`h3:has-text('${title}')`);
    if (item) return item;
    else throw new Error("No item found by title");
  }
}
