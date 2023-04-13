import { test, expect } from "@playwright/test";

test.describe("test various components", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
  });

  test("Visibility of hideable elements", async ({ page }) => {
    const hideable = page.locator("#displayed-text");
    await expect(hideable).toBeVisible();
    // Hide button and check is hidden
    const hideButton = page.locator("#hide-textbox");
    await hideButton.click();
    await expect(hideable).toBeHidden();
  });

  test("Handle JS dialogs", async ({ page }) => {
    const confirmButton = page.locator("#confirmbtn");
    await page.pause();
    page.on("dialog", (d) => d.accept());
    await confirmButton.click();
  });

  test("Mouse hover", async ({ page }) => {
    const hoverButton = page.locator("#mousehover");
    await page.pause();
    await hoverButton.hover();
    const firstDropElement = page.locator(".mouse-hover-content").first();
    await firstDropElement.click();
  });

  test.only("Handle iframes", async ({ page }) => {
    const framePage = page.frameLocator("#courses-iframe");
    const navItem = framePage.locator("[href='learning-path']:visible");
    const text = await navItem.textContent();
    console.log(text);
  });
});
