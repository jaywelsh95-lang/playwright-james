import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { basketSelectors } from '../selectors/basket.selectors';
import { urls } from '../test-data/urls';
import { BasePage } from './base-page';

export class BasketPage extends BasePage {
  readonly headerComponent: HeaderComponent;
  readonly cartContainer: Locator;
  readonly cartItems: Locator;
  readonly productQty: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly removeButton: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.cartContainer = page.locator(basketSelectors.cartContainer);
    this.cartItems = page.locator(basketSelectors.cartItem);
    this.productQty = page.locator(basketSelectors.productQty);
    this.productDescription = page.locator(basketSelectors.productDescription);
    this.productPrice = page.locator(basketSelectors.productPrice);
    this.removeButton = page.locator(basketSelectors.removeButton);
    this.continueShoppingButton = page.locator(basketSelectors.continueShoppingButton);
    this.checkoutButton = page.locator(basketSelectors.checkoutButton);
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(urls.cart);
    await expect(this.cartContainer).toBeVisible();
  }

  async expectHeaderVisible() {
    await this.headerComponent.expectSwagLabsHeaderVisible();
  }

  async expectBasketElementsPresent() {
    await expect(this.cartItems.first()).toBeVisible();
    await expect(this.productQty.first()).toBeVisible();
    await expect(this.productDescription.first()).toBeVisible();
    await expect(this.productPrice.first()).toBeVisible();
    await expect(this.removeButton.first()).toBeVisible();
    await expect(this.continueShoppingButton).toBeVisible();
    await expect(this.checkoutButton).toBeVisible();
  }

  async clickCheckoutAndExpectNextStep() {
    await this.checkoutButton.click();
    await this.page.waitForURL('**/checkout-step-one.html');
  }

  async getCartItemsCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async removeProduct(productName: string) {
    const productItem = this.cartItems.filter({ hasText: productName });
    await expect(productItem).toBeVisible();
    await productItem.locator(basketSelectors.removeButton).click();
  }

  async removeProductAndVerifyRemoved(productName: string, initialCount: number) {
    await this.removeProduct(productName);
    const updatedCount = await this.getCartItemsCount();
    await expect(updatedCount).toBe(initialCount - 1);
  }
}
