import { test, expect } from "@playwright/test";

// When passing some context data to the browser like cookies, local storage, etc.
// We use the "browser" fixture
test("browser context test", async ({ browser }) => {
  const context = await browser.newContext(/*cookies or any web API data*/);
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
});

// When we don't need additional information passed to the browser
// We use the "page" fixture
test("empty fields login @regression", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.locator("#signInBtn").click();
  await expect(page.locator("[style*= 'block']")).toContainText("Empty");
});

test("some empty fields login @regression", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByLabel("Username:").fill("someusername");
  await page.getByLabel("Username:").fill("otherusername");
  await page.locator("#signInBtn").click();
  await expect(page.locator("[style*= 'block']")).toContainText("Empty");
});

test("incorrect fields login @smoke", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByLabel("Username:").fill("someusername");
  await page.getByLabel("Password:").fill("somepassword");
  await page.locator("select[class='form-control']").selectOption("Consultant");
  await page.locator("#terms").click();
  await page.locator("#signInBtn").click();
  await expect(page.locator("[style*= 'block']")).toContainText("Incorrect");
});

test("successful login - fail getting content", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByLabel("Username:").fill("rahulshettyacademy");
  await page.getByLabel("Password:").fill("learning");
  await page.locator("#terms").click();
  await page.locator("#signInBtn").click();

  // Logged
  const cardTitles = await page.locator(".card-title a");

  // const firstTitle = await cardTitles.first().textContent();
  // await page.locator(".card-title a").nth(0); ==> Same thing

  // Playwright will not make an actionability check for 'allTextContents()'
  // Therefore, it will not wait until its contents are available and will return an empty array (**)
  // For more about actionability checks go to: https://playwright.dev/docs/actionability
  console.log(await cardTitles.allTextContents());
});

test.only("successful login - successfully getting content", async ({
  page,
}) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  await page.getByLabel("Username:").fill("rahulshettyacademy");
  await page.getByLabel("Password:").fill("learning");
  await page.locator("#terms").click();

  // (**) SOLUTION
  // When dealing with non-service-based apps, and there's no calls to API's or any response to wait for,
  // We can wrap the action that will generate a redirection into a Promise call with a waitForURL() method
  // To wait for the redirected page to load before continuing with the next steps of the test
  await Promise.all([
    page.locator("#signInBtn").click(),
    page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop"),
  ]);

  // Logged
  const cardTitles = await page.locator(".card-title a");
  console.log(await cardTitles.allTextContents());
});
