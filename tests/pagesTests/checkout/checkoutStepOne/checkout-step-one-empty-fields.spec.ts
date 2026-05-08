import { expect, test } from '../../../../fixtures/pages.fixture';
import { credentials } from '../../../../test-data/credentials';

test.describe('Checkout Step One - Empty Fields', () => {
  test.beforeEach(async ({ loginPage, plpPage, headerComponent, basketPage, checkoutStepOnePage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });

    await test.step('Verify PLP is loaded', async () => {
      await plpPage.expectLoaded();
    });

    await test.step('Add a product to basket', async () => {
      await plpPage.addProductToBasket('Sauce Labs Backpack');
    });

    await test.step('Navigate to basket and checkout', async () => {
      await headerComponent.openBasketAndExpectProductsPresent();
      await basketPage.clickCheckoutAndExpectNextStep();
    });

    await test.step('Verify checkout step one page is loaded', async () => {
      await checkoutStepOnePage.expectLoaded();
    });
  });

  test('Continue with empty fields shows an error message', async ({ checkoutStepOnePage }) => {
    await test.step('Click continue without entering details', async () => {
      await checkoutStepOnePage.clickContinueAndExpectError();
    });

    await test.step('Verify error message is displayed', async () => {
      await checkoutStepOnePage.expectErrorMessageVisible();
    });
  });
});
