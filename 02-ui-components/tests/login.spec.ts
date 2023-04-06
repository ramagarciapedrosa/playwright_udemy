import { test, expect, Locator } from "@playwright/test";
import { LoginPage } from "../modules/loginPage";

test.describe("Login page tests", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("Successful login", async ({ page }) => {
    const login = new LoginPage(page);
    await login.fillForm(
      "rahulshettyacademy",
      "learning",
      "user",
      "TEACHER",
      true
    );
    await login.clickOn(login.locator.signInButton);
    await login.checker.checkLoginRedirection();
  });

  //! << Modal tests >>
  test.describe("Verify modal behaviour", () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.clickOn(login.locator.userRadioButton);
    });

    test("Clicking on 'User' radio button triggers modal", async ({ page }) => {
      const login = new LoginPage(page);
      await login.checker.checkModalIsDisplayed(login.locator.warningModal);
    });

    test("Clicking on 'Cancel' button closes the modal", async ({ page }) => {
      const login = new LoginPage(page);
      await login.clickOn(login.locator.modalCancelButton);
      await login.checker.checkModalIsHidden(login.locator.warningModal);
    });

    test("Clicking on 'Cancel' button doesn't change selection", async ({
      page,
    }) => {
      const login = new LoginPage(page);
      await login.clickOn(login.locator.modalCancelButton);
      await login.checker.checkIsChecked(login.locator.adminRadioButton);
    });

    test("Clicking on 'Okay' button closes the modal", async ({ page }) => {
      const login = new LoginPage(page);
      await login.clickOn(login.locator.modalOkayButton);
      await login.checker.checkModalIsHidden(login.locator.warningModal);
    });

    test("Clicking on 'Okay' button changes selection", async ({ page }) => {
      const login = new LoginPage(page);
      await login.clickOn(login.locator.modalOkayButton);
      await login.checker.checkIsChecked(login.locator.userRadioButton);
    });
  });

  //! << Radio button tests >>
  test.describe("Verify radio button selection", () => {
    test.beforeEach(async ({ page }) => {
      const login = new LoginPage(page);
      await login.clickOn(login.locator.userRadioButton);
      await login.clickOn(login.locator.modalOkayButton);
    });

    test("'User' radio button is selected when clicked", async ({ page }) => {
      const login = new LoginPage(page);
      await login.checker.checkIsChecked(login.locator.userRadioButton);
      await login.checker.checkIsNotChecked(login.locator.adminRadioButton);
    });

    test("'Admin' radio button is selected when clicked", async ({ page }) => {
      const login = new LoginPage(page);
      await login.clickOn(login.locator.adminRadioButton);
      await login.checker.checkIsChecked(login.locator.adminRadioButton);
      await login.checker.checkIsNotChecked(login.locator.userRadioButton);
    });
  });

  test("Verify blinking text has blinking property", async ({ page }) => {
    const login = new LoginPage(page);
    await expect(login.locator.blinkingText).toHaveClass("blinkingText");
  });
});
