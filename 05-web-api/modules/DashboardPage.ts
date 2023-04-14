import { Page, Locator } from "@playwright/test";
import { DashboardLocator } from "./DashboardLocator";
import { CartPage } from "./cartPage";
import { HeaderLocator } from "./_HeaderLocator";
import { CheckoutPage } from "./CheckoutPage";

export interface Product {
  readonly title: string;
  readonly price: string;
  readonly cartButton: Locator;
  readonly viewButton: Locator;
}

export class DashboardPage {
  page: Page;
  locate: DashboardLocator;
  cartItems: Product[];

  constructor(page: Page) {
    this.page = page;
    this.locate = new DashboardLocator(page);
    this.cartItems = [];
  }

  async generateItem(locator: Locator) {
    const product: Product = {
      title: await this.locate.itemTitle(locator),
      price: await this.locate.itemPrice(locator),
      cartButton: this.locate.itemCartButton(locator),
      viewButton: this.locate.itemViewButton(locator),
    };

    return product;
  }

  async navigate() {
    await this.page.goto("https://rahulshettyacademy.com/client/");
  }

  async navigateToCart() {
    await this.locate.cart.click();
    await this.page.waitForLoadState("networkidle");
    return new CartPage(this.page);
  }

  async navigateToOrders() {
    await this.locate.orders.click();
    await this.page.waitForLoadState("networkidle");
    return new CheckoutPage(this.page);
  }

  async addItemToCart(itemName: string) {
    const itemLocator = await this.locate.productByName(itemName);
    let item: Product;
    if (itemLocator) {
      item = await this.generateItem(itemLocator);
      this.cartItems.push(item);
      await item.cartButton.click();
      return item;
    } else throw new Error("No item found");
  }
}
