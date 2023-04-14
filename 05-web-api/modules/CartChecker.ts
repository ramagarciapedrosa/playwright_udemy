import { Locator, Page, expect } from "@playwright/test";

export class CartChecker {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async cartItemAdded(item: Locator) {
    await expect(item).toBeVisible();
  }
}
