import { Locator, Page } from "@playwright/test";

export abstract class HeaderLocator {
  readonly page: Page;
  readonly logo: Locator;
  readonly orders: Locator;
  readonly cart: Locator;

  constructor(page: Page) {
    this.page = page;
    this.logo = page.locator(".logo");
    this.orders = page.locator(".btn-custom[routerlink*=myorders]");
    this.cart = page.locator("[routerlink*=cart]");
  }
}
