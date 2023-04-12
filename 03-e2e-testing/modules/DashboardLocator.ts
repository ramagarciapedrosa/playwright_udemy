import { Page, Locator } from "@playwright/test";
import { HeaderLocator } from "./_HeaderLocator";

export class DashboardLocator extends HeaderLocator {
  readonly page: Page;

  constructor(page: Page) {
    super(page);
    this.page = page;
  }

  async itemTitle(product: Locator) {
    const title = await product.locator("b").textContent();
    return this.handleItemLocation(title, "Title");
  }

  async itemPrice(product: Locator) {
    const price = await product.locator(".text-muted").textContent();
    return this.handleItemLocation(price, "Price");
  }

  itemCartButton(product: Locator) {
    const button = product.getByRole("button", { name: " Add To Cart" });
    return this.handleItemLocation(button, "CartButton");
  }

  itemViewButton(product: Locator) {
    const button = product.getByRole("button", { name: " View" });
    return this.handleItemLocation(button, "ViewButton");
  }

  private handleItemLocation(item: any, itemName: string) {
    if (item) return item;
    else throw new Error(`${itemName} not found`);
  }

  async byName(productName: string) {
    const productList = await this.page.locator(".card-body").all();
    for (const product of productList) {
      const text = await product.locator("b").textContent();
      if (text?.toLowerCase() === productName.toLowerCase()) {
        return product;
      }
    }
    return null;
  }
}
