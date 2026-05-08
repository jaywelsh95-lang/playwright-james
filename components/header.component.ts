import { expect, type Locator, type Page } from '@playwright/test';
import { headerSelectors } from '../selectors/header.selectors';
import { urls } from '../test-data/urls';

export class HeaderComponent {
  readonly page: Page;
  readonly headerContainer: Locator;
  readonly headerLogo: Locator;
  readonly menuButton: Locator;
  readonly shoppingCartContainer: Locator;
  readonly shoppingCartLink: Locator;
  readonly shoppingCartBadge: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly getStartedLink: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerContainer = page.locator(headerSelectors.headerContainer);
    this.headerLogo = page.locator(headerSelectors.headerLogo);
    this.menuButton = page.locator(headerSelectors.headerMenuButton);
    this.shoppingCartContainer = page.locator(headerSelectors.headerShoppingContainer);
    this.shoppingCartLink = page.locator(headerSelectors.shoppingCartLink);
    this.shoppingCartBadge = page.locator(headerSelectors.shoppingCartBadge);
    this.cartList = page.locator(headerSelectors.cartList);
    this.cartItems = page.locator(headerSelectors.cartItem);
    this.getStartedLink = page.getByRole(headerSelectors.getStartedLink.role, {
      name: headerSelectors.getStartedLink.name,
    });
  }

  async expectSwagLabsHeaderVisible() {
    await expect(this.headerContainer).toBeVisible();
    await expect(this.headerLogo).toBeVisible();
    await expect(this.headerLogo).toHaveText('Swag Labs');
    await expect(this.menuButton).toBeVisible();
    await expect(this.shoppingCartContainer).toBeVisible();
    await expect(this.shoppingCartLink).toBeVisible();
  }

  async openGetStarted() {
    await this.getStartedLink.click();
  }

  async expectShoppingCartBadgeCount(expectedCount: string) {
    if (expectedCount === '0') {
      await expect(this.shoppingCartBadge).toHaveCount(0);
      return;
    }

    await expect(this.shoppingCartBadge).toHaveText(expectedCount);
  }

  async openBasketAndExpectProductsPresent() {
    await this.shoppingCartLink.click();
    await expect(this.page).toHaveURL(urls.cart);
    await expect(this.cartList).toBeVisible();
    await expect(this.cartItems.first()).toBeVisible();
  }
}
