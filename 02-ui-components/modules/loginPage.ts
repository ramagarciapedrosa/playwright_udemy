import { Page, Locator } from "@playwright/test";
import { LoginChecker } from "./loginChecker";
import { LoginLocator } from "./loginLocator";

export class LoginPage {
  page: Page;
  checker: LoginChecker;
  locator: LoginLocator;

  constructor(page: Page) {
    this.page = page;
    this.checker = new LoginChecker(page);
    this.locator = new LoginLocator(page);
  }

  async goto() {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  }

  async fillForm(
    username: string,
    password: string,
    userType: string,
    role: string,
    agreeTerms: boolean
  ) {
    await this.fillInput(this.locator.userName, username);
    await this.fillInput(this.locator.password, password);
    if (userType.toLowerCase() === "admin")
      await this.clickOn(this.locator.adminRadioButton);
    else if (userType.toLowerCase() === "user") {
      await this.clickOn(this.locator.userRadioButton);
      await this.clickOn(this.locator.modalOkayButton);
    }
    const capitalizedRole = role[0].toUpperCase() + role.slice(1).toLowerCase();
    await this.selectDropOption(this.locator.roleDropdown, capitalizedRole);
    if (agreeTerms) this.clickOn(this.locator.termsCheckbox);
  }

  async fillInput(locator: Locator, input: string) {
    await locator.fill(input);
  }

  async clickOn(locator: Locator) {
    await locator.click();
  }

  async selectDropOption(locator: Locator, value: string) {
    await locator.selectOption(value);
  }
}
