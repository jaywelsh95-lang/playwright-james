import { expect, test } from '../../../../fixtures/pages.fixture';
import { credentials } from '../../../../test-data/credentials';
import { userData } from '../../../../test-data/userData';

test.describe('Checkout Step Two', () => {
  test.beforeEach(async ({ loginPage, plpPage, headerComponent, basketPage, checkoutStepOnePage, checkoutStepTwoPage }) => {
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

    await test.step('Verify checkout step two page is loaded', async () => {
      await checkoutStepTwoPage.expectLoaded();
    });
  });

  test('Header is present on checkout step two page', async ({ checkoutStepTwoPage }) => {
    await test.step('Verify header elements are visible', async () => {
      await checkoutStepTwoPage.expectHeaderVisible();
    });
  });

  test('Product details are visible on checkout step two', async ({ checkoutStepTwoPage }) => {
    await test.step('Verify product details are visible', async () => {
      await checkoutStepTwoPage.expectProductDetailsVisible();
    });
  });

  test('Payment information is visible on checkout step two', async ({ checkoutStepTwoPage }) => {
    await test.step('Verify payment information is visible', async () => {
      await checkoutStepTwoPage.expectPaymentInfoVisible();
    });
  });

  test('Shipping information is visible on checkout step two', async ({ checkoutStepTwoPage }) => {
    await test.step('Verify shipping information is visible', async () => {
      await checkoutStepTwoPage.expectShippingInfoVisible();
    });
  });

  test('Price totals are visible on checkout step two', async ({ checkoutStepTwoPage }) => {
    await test.step('Verify price totals are visible', async () => {
      await checkoutStepTwoPage.expectPriceTotalsVisible();
    });
  });

  test('Finish button completes the order', async ({ checkoutStepTwoPage }) => {
    await test.step('Click finish and verify order success page', async () => {
      await checkoutStepTwoPage.clickFinishAndExpectOrderSuccess();
    });
  });
});