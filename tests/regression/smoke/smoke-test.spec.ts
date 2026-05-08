import { test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';
import { userData } from '../../../test-data/user-data';

test.describe('Smoke Test', () => {
  test('Complete order placement flow', async ({ loginPage, plpPage, headerComponent, basketPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
    await test.step('Login and navigate to PLP', async () => {
      await loginPage.goto();
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });

    await test.step('Add product and navigate to checkout', async () => {
      await plpPage.addProductToBasket('Sauce Labs Backpack');
      await headerComponent.openBasketAndExpectProductsPresent();
      await basketPage.clickCheckoutAndExpectNextStep();
    });

    await test.step('Complete checkout form', async () => {
      await checkoutStepOnePage.fillCheckoutForm(
        userData.checkoutStepOne.firstName,
        userData.checkoutStepOne.lastName,
        userData.checkoutStepOne.postalCode,
      );
      await checkoutStepOnePage.clickContinueAndExpectNextStep();
    });

    await test.step('Complete order', async () => {
      await checkoutStepTwoPage.clickFinishAndExpectOrderSuccess();
    });

    await test.step('Verify order success', async () => {
      await checkoutCompletePage.expectSuccessMessageVisible();
    });
  });
});
