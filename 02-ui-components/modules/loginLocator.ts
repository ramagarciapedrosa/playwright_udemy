import { Page, Locator } from "@playwright/test";

export class LoginLocator {
  page: Page;
  userName: Locator;
  password: Locator;
  radioButtons: Locator;
  adminRadioButton: Locator;
  userRadioButton: Locator;
  roleDropdown: Locator;
  warningModal: Locator;
  termsCheckbox: Locator;
  signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByLabel("Username:");
    this.password = page.getByLabel("Password:");
    this.radioButtons = page.locator("span.checkmark");
    this.adminRadioButton = this.radioButtons.first();
    this.userRadioButton = this.radioButtons.last();
    this.warningModal = page.locator(".modal-content");
    this.roleDropdown = page.locator("select[class='form-control']");
    this.termsCheckbox = page.locator("#terms");
    this.signInButton = page.locator("#signInBtn");
  }
}
