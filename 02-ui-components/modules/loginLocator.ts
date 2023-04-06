import { Page, Locator } from "@playwright/test";

export class LoginLocator {
  page: Page;
  userName: Locator;
  password: Locator;
  adminRadioButton: Locator;
  userRadioButton: Locator;
  roleDropdown: Locator;
  termsCheckbox: Locator;
  signInButton: Locator;

  warningModal: Locator;
  modalOkayButton: Locator;
  modalCancelButton: Locator;

  blinkingText: Locator;

  constructor(page: Page) {
    this.page = page;
    this.userName = page.getByLabel("Username:");
    this.password = page.getByLabel("Password:");
    this.adminRadioButton = page.locator("span.checkmark").first();
    this.userRadioButton = page.locator("span.checkmark").last();
    this.roleDropdown = page.locator("select[class='form-control']");
    this.termsCheckbox = page.locator("#terms");
    this.signInButton = page.locator("#signInBtn");

    this.warningModal = page.locator(".modal-content");
    this.modalOkayButton = page.locator("#okayBtn");
    this.modalCancelButton = page.locator("#cancelBtn");

    this.blinkingText = page.locator(".blinkingText");
  }
}
