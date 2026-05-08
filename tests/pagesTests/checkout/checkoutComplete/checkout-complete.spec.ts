import { expect, test } from '../../../../fixtures/pages.fixture';
import { credentials } from '../../../../test-data/credentials';
import { userData } from '../../../../test-data/userData';

test.describe('Checkout Complete', () => {
  test.beforeEach(async ({ loginPage, plpPage, headerComponent, basketPage, checkoutStepOnePage, checkoutStepTwoPage, checkoutCompletePage }) => {
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

    await test.step('Fill checkout step one form and continue', async () => {
      await checkoutStepOnePage.fillCheckoutForm(
        userData.checkoutStepOne.firstName,
        userData.checkoutStepOne.lastName,
        userData.checkoutStepOne.postalCode,
      );
      await checkoutStepOnePage.clickContinueAndExpectNextStep();
    });

    await test.step('Complete checkout step two', async () => {
      await checkoutStepTwoPage.clickFinishAndExpectOrderSuccess();
    });

    await test.step('Verify checkout complete page is loaded', async () => {
      await checkoutCompletePage.expectLoaded();
    });
  });

  test('Success message is visible on checkout complete page', async ({ checkoutCompletePage }) => {
    await test.step('Verify success message is visible', async () => {
      await checkoutCompletePage.expectSuccessMessageVisible();
    });
  });

  test('Back home button is visible on checkout complete page', async ({ checkoutCompletePage }) => {
    await test.step('Verify back home button is visible', async () => {
      await checkoutCompletePage.expectBackHomeButtonVisible();
    });
  });

  test('Back home button returns to PLP', async ({ checkoutCompletePage }) => {
    await test.step('Click back home and verify return to PLP', async () => {
      await checkoutCompletePage.clickBackHomeAndExpectPLP();
    });
  });
});
