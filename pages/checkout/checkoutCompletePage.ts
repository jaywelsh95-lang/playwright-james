import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../../components/header.component';
import { checkoutCompleteSelectors } from '../../selectors/checkout/checkoutComplete.selectors';
import { BasePage } from '../base-page';

export class CheckoutCompletePage extends BasePage {
  readonly headerComponent: HeaderComponent;
  readonly successMessage: Locator;
  readonly successText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.successMessage = page.locator(checkoutCompleteSelectors.successMessage);
    this.successText = page.locator(checkoutCompleteSelectors.successText);
    this.backHomeButton = page.locator(checkoutCompleteSelectors.backHomeButton);
  }

  async expectLoaded() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.backHomeButton).toBeVisible();
  }

  async expectHeaderVisible() {
    await this.headerComponent.expectSwagLabsHeaderVisible();
  }

  async expectSuccessMessageVisible() {
    await expect(this.successMessage).toBeVisible();
    await expect(this.successText).toBeVisible();
  }

  async expectBackHomeButtonVisible() {
    await expect(this.backHomeButton).toBeVisible();
  }

  async clickBackHomeAndExpectPLP() {
    await this.backHomeButton.click();
    await this.page.waitForURL('**/inventory.html');
  }
}