import { expect, type Locator, type Page } from '@playwright/test';
import { HeaderComponent } from '../../components/header.component';
import { checkoutStepOneSelectors } from '../../selectors/checkout/checkout-step-one.selectors';
import { BasePage } from '../base-page';

export class CheckoutStepOnePage extends BasePage {
  readonly headerComponent: HeaderComponent;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly postalCodeInput: Locator;
  readonly cancelButton: Locator;
  readonly continueButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.headerComponent = new HeaderComponent(page);
    this.firstNameInput = page.locator(checkoutStepOneSelectors.firstNameInput);
    this.lastNameInput = page.locator(checkoutStepOneSelectors.lastNameInput);
    this.postalCodeInput = page.locator(checkoutStepOneSelectors.postalCodeInput);
    this.cancelButton = page.locator(checkoutStepOneSelectors.cancelButton);
    this.continueButton = page.locator(checkoutStepOneSelectors.continueButton);
    this.errorMessage = page.locator('[data-test="error"]');
  }

  async expectLoaded() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async expectHeaderVisible() {
    await this.headerComponent.expectSwagLabsHeaderVisible();
  }

  async expectFormFieldsVisible() {
    await expect(this.firstNameInput).toBeVisible();
    await expect(this.lastNameInput).toBeVisible();
    await expect(this.postalCodeInput).toBeVisible();
  }

  async expectButtonsVisible() {
    await expect(this.cancelButton).toBeVisible();
    await expect(this.continueButton).toBeVisible();
  }

  async clickContinueAndExpectNextStep() {
    await this.continueButton.click();
    await this.page.waitForURL('**/checkout-step-two.html');
  }

  async clickContinueAndExpectError() {
    await this.continueButton.click();
    await expect(this.errorMessage).toBeVisible();
  }

  async expectErrorMessageVisible() {
    await expect(this.errorMessage).toBeVisible();
  }

  async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.postalCodeInput.fill(postalCode);
  }
}
