import { Locator, Page } from "@playwright/test";
import { HeaderLocator } from "./_HeaderLocator";

export class LoginLocator extends HeaderLocator {
  readonly page: Page;
  readonly emailField: Locator;
  readonly passwordField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;

    this.emailField = page.locator("#userEmail");
    this.passwordField = page.locator("#userPassword");
    this.loginButton = page.locator("#login");
  }
}
