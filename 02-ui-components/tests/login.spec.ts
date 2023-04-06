import { test, expect, Locator } from "@playwright/test";
import { LoginPage } from "../modules/loginPage";

test.describe("login", () => {
  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  test("successful login", async ({ page }) => {
    const login = new LoginPage(page);
    await page.pause();
    await login.fillForm(
      "rahulshettyacademy",
      "learning",
      "Admin",
      "Teacher",
      true
    );
    await login.clickOn(login.locator.signInButton);
    await login.checker.checkLoginRedirection();
  });

  test("Clicking on 'Admin' radio button triggers modal", async ({ page }) => {
    const login = new LoginPage(page);
    await login.clickOn(login.locator.userRadioButton);
    await login.checker.checkModalDisplay(login.locator.warningModal);
  });
});
