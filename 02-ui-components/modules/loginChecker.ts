import { Locator, Page, expect } from "@playwright/test";

export class LoginChecker {
  page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async checkLoginRedirection() {
    await expect(this.page).toHaveURL(
      "https://rahulshettyacademy.com/angularpractice/shop"
    );
  }

  async checkRedirectionURL(url: string) {
    await expect(this.page).toHaveURL(url);
  }

  async checkModalIsDisplayed(modal: Locator) {
    await expect(modal).toBeVisible();
  }

  async checkModalIsHidden(modal: Locator) {
    await expect(modal).toBeHidden();
  }

  async checkIsChecked(locator: Locator) {
    await expect(locator).toBeChecked();
  }

  async checkIsNotChecked(locator: Locator) {
    expect(await locator.isChecked()).toBeFalsy();
  }
}
