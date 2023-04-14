import { Page, Locator } from "@playwright/test";
import { HeaderLocator } from "./_HeaderLocator";

export class CheckoutLocator extends HeaderLocator {
  readonly page: Page;
  readonly email: Locator;
  readonly country: Locator;
  readonly countryDropdown: Locator;
  readonly countryOptions: Locator;
  readonly submitButton: Locator;
  readonly confirmationMessage: Locator;
  readonly confirmationOrderId: Locator;
  readonly ordersTable: Locator;
  readonly tableRows: Locator;

  constructor(page: Page) {
    super(page);
    this.page = page;
    this.email = page.locator(".payment__shipping input").first();
    this.country = page.locator(".payment__shipping input").last();
    this.countryDropdown = page.locator("[class*=results]");
    this.countryOptions = page.locator("button[type='button']");
    this.submitButton = page.locator(".action__submit");
    this.confirmationMessage = page.locator(".hero-primary");
    this.confirmationOrderId = page.locator("label[class='ng-star-inserted']");
    this.ordersTable = page.locator("table");
  }
}
