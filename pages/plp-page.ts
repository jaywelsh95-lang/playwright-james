import { expect, type Page } from '@playwright/test';
import { headerSelectors } from '../selectors/header.selectors';
import { plpSelectors } from '../selectors/plp.selector';
import { BasePage } from './base-page';

export class PLPPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  productByName(productName: string) {
    return this.page.locator(plpSelectors.inventoryItem).filter({
      hasText: productName,
    });
  }

  async expectLoaded() {
    await this.page.waitForURL('**/inventory.html');
    await this.checkContentLoaded();
  }

  async checkContentLoaded() {
    await expect(this.page.locator(plpSelectors.inventoryContainer)).toBeVisible();
    await expect(this.page.locator(plpSelectors.inventoryItem)).toHaveCount(6);
  }

  async addProductToBasket(productName: string) {
    const product = this.productByName(productName);

    await expect(product).toBeVisible();
    await product.getByRole('button', { name: /add to cart/i }).click();
  }

  async openProductDetails(productName: string) {
    const product = this.productByName(productName);

    await expect(product).toBeVisible();
    await product.locator(plpSelectors.inventoryItemName).click();
  }

  async addProductToBasketAndExpectCounter(productName: string, expectedBasketCount: number) {
    await this.addProductToBasket(productName);
    await this.expectBasketCounterValue(expectedBasketCount);
  }

  async removeProductFromBasket(productName: string) {
    const product = this.productByName(productName);

    await expect(product).toBeVisible();
    await product.getByRole('button', { name: /remove/i }).click();
  }

  async removeProductFromBasketAndExpectCounter(productName: string, expectedBasketCount: number) {
    await this.removeProductFromBasket(productName);
    await this.expectBasketCounterValue(expectedBasketCount);
  }

  async getBasketCounterValue(): Promise<number> {
    const badge = this.page.locator(headerSelectors.shoppingCartBadge);
    if ((await badge.count()) === 0) {
      return 0;
    }

    const count = await badge.textContent();
    return parseInt(count || '0', 10);
  }

  async expectBasketCounterVisible() {
    await expect(this.page.locator(headerSelectors.shoppingCartBadge)).toBeVisible();
  }

  async expectBasketCounterValue(expectedBasketCount: number) {
    if (expectedBasketCount === 0) {
      await expect(this.page.locator(headerSelectors.shoppingCartBadge)).toHaveCount(0);
      return;
    }

    await expect(this.page.locator(headerSelectors.shoppingCartBadge)).toHaveText(
      String(expectedBasketCount),
    );
  }

  async filterByPrice(filterOption: string) {
    await this.page.locator(plpSelectors.filterDropdown).selectOption(filterOption);
    await this.page.waitForLoadState('networkidle');
  }

  async verifyProductsAreFiltered(expectedSortOrder: string) {
    const prices = await this.page.locator(plpSelectors.inventoryItem).evaluateAll((elements) =>
      elements.map((element) => {
        const priceText = element.querySelector('.inventory_item_price')?.textContent || '0';
        return parseFloat(priceText.replace('$', ''));
      }),
    );

    if (expectedSortOrder.includes('low') || expectedSortOrder.includes('asc')) {
      const sorted = [...prices].sort((a, b) => a - b);
      expect(prices).toEqual(sorted);
    } else if (expectedSortOrder.includes('high') || expectedSortOrder.includes('desc')) {
      const sorted = [...prices].sort((a, b) => b - a);
      expect(prices).toEqual(sorted);
    }
  }

  async getProductCount(): Promise<number> {
    return this.page.locator(plpSelectors.inventoryItem).count();
  }
}
