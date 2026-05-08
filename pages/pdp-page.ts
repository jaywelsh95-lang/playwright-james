import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { pdpSelectors } from '../selectors/pdp.selectors';
import { BasePage } from './base-page';
import { PLPPage } from './plp-page';

export class PDPPage extends BasePage {
  readonly headerComponent: HeaderComponent;
  readonly productContainer: Locator;
  readonly productName: Locator;
  readonly productPrice: Locator;
  readonly productDescription: Locator;
  readonly productImage: Locator;
  readonly addToCartButton: Locator;
  readonly backButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.productContainer = page.locator(pdpSelectors.productContainer);
    this.productName = page.locator(pdpSelectors.productName);
    this.productPrice = page.locator(pdpSelectors.productPrice);
    this.productDescription = page.locator(pdpSelectors.productDescription);
    this.productImage = page.locator(pdpSelectors.productImage);
    this.addToCartButton = page.locator(pdpSelectors.addToCartButton);
    this.backButton = page.locator(pdpSelectors.backButton);
  }

  async expectLoaded() {
    await this.page.waitForURL('**/inventory-item.html**');
  }

  async expectHeaderVisible() {
    await this.headerComponent.expectSwagLabsHeaderVisible();
  }

  async expectProductContentVisible() {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.productDescription).toBeVisible();
  }

  async addProductToCart() {
    await this.addToCartButton.click();
  }

  async openFromPLP(plpPage: PLPPage, productName: string) {
    await plpPage.openProductDetails(productName);
    await this.expectLoaded();
  }

  async clickProductName(productName: string) {
    await this.productName.filter({ hasText: productName }).click();
  }
}