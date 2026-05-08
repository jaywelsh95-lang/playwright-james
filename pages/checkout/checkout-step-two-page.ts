import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../../components/header.component';
import { checkoutStepTwoSelectors } from '../../selectors/checkout/checkout-step-two.selectors';
import { BasePage } from '../base-page';

export class CheckoutStepTwoPage extends BasePage {
  readonly headerComponent: HeaderComponent;
  readonly productDetails: Locator;
  readonly productName: Locator;
  readonly productDescription: Locator;
  readonly productPrice: Locator;
  readonly productQty: Locator;
  readonly paymentInfo: Locator;
  readonly shippingInfo: Locator;
  readonly subtotal: Locator;
  readonly tax: Locator;
  readonly total: Locator;
  readonly finishButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.productDetails = page.locator(checkoutStepTwoSelectors.productDetails);
    this.productName = page.locator(checkoutStepTwoSelectors.productName);
    this.productDescription = page.locator(checkoutStepTwoSelectors.productDescription);
    this.productPrice = page.locator(checkoutStepTwoSelectors.productPrice);
    this.productQty = page.locator(checkoutStepTwoSelectors.productQty);
    this.paymentInfo = page.locator(checkoutStepTwoSelectors.paymentInfo);
    this.shippingInfo = page.locator(checkoutStepTwoSelectors.shippingInfo);
    this.subtotal = page.locator(checkoutStepTwoSelectors.subtotal);
    this.tax = page.locator(checkoutStepTwoSelectors.tax);
    this.total = page.locator(checkoutStepTwoSelectors.total);
    this.finishButton = page.locator(checkoutStepTwoSelectors.finishButton);
  }

  async expectLoaded() {
    await expect(this.productDetails.first()).toBeVisible();
    await expect(this.finishButton).toBeVisible();
  }

  async expectHeaderVisible() {
    await this.headerComponent.expectSwagLabsHeaderVisible();
  }

  async expectProductDetailsVisible() {
    await expect(this.productDetails.first()).toBeVisible();
    await expect(this.productName.first()).toBeVisible();
    await expect(this.productDescription.first()).toBeVisible();
    await expect(this.productPrice.first()).toBeVisible();
    await expect(this.productQty.first()).toBeVisible();
  }

  async expectPaymentInfoVisible() {
    await expect(this.paymentInfo).toBeVisible();
  }

  async expectShippingInfoVisible() {
    await expect(this.shippingInfo).toBeVisible();
  }

  async expectPriceTotalsVisible() {
    await expect(this.subtotal).toBeVisible();
    await expect(this.tax).toBeVisible();
    await expect(this.total).toBeVisible();
  }

  async clickFinishAndExpectOrderSuccess() {
    await this.finishButton.click();
    await this.page.waitForURL('**/checkout-complete.html');
  }
}
