import { test, expect } from "@playwright/test";

test.describe("Successful login", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
  });

  test("Verify toast display", async ({ page }) => {
    await expect(
      page.locator("#toast-container").getByLabel("Login Successfully")
    ).toBeVisible();
  });

  test("Verify url", async ({ page }) => {
    await expect(page).toHaveURL(
      "https://rahulshettyacademy.com/client/dashboard/dash"
    );
  });

  test("Get list of items", async ({ page }) => {
    // Wait dynamically until page is fully loaded
    // Can be used for service-based apps
    await page.waitForLoadState("networkidle");
    // Then get already loaded/rendered items information
    const allItems = await page.locator(".card").allTextContents();
    console.log(allItems);
  });
});
