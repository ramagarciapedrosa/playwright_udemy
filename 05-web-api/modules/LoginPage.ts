import { Page, Locator } from "@playwright/test";
import { LoginLocator } from "./LoginLocator";
import { DashboardPage } from "./DashboardPage";

export class LoginPage {
  page: Page;
  locate: LoginLocator;

  constructor(page: Page) {
    this.page = page;
    this.locate = new LoginLocator(page);
  }

  async navigate() {
    await this.page.goto("https://rahulshettyacademy.com/client");
  }

  async login(email: string, password: string) {
    await this.locate.emailField.fill(email);
    await this.locate.passwordField.fill(password);
    await this.locate.loginButton.click();
    return new DashboardPage(this.page);
  }
}
