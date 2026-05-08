import { test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';
import { userData } from '../../../test-data/userData';

test.describe('E2E Test', () => {
  test('Complete user journey from login to order completion and return to PLP', async ({
    loginPage,
    plpPage,
    pdpPage,
    headerComponent,
    basketPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage
  }) => {
    await test.step('Navigate to login page and verify elements', async () => {
      await loginPage.goto();
      await loginPage.expectLoginElementsVisible();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });

    await test.step('Verify PLP is loaded with content', async () => {
      await plpPage.expectLoaded();
    });

    await test.step('Navigate to product details page', async () => {
      await plpPage.openProductDetails('Sauce Labs Backpack');
      await pdpPage.expectLoaded();
    });

    await test.step('Verify PDP header and product content', async () => {
      await pdpPage.expectHeaderVisible();
      await pdpPage.expectProductContentVisible();
    });

    await test.step('Add product from PDP to basket', async () => {
      await pdpPage.addProductToCart();
    });

    await test.step('Navigate back to PLP', async () => {
      await pdpPage.backButton.click();
      await plpPage.expectLoaded();
    });

    await test.step('Verify basket counter updates', async () => {
      await plpPage.expectBasketCounterValue(1);
    });

    await test.step('Add another product from PLP', async () => {
      await plpPage.addProductToBasket('Sauce Labs Bike Light');
    });

    await test.step('Verify basket has 2 products', async () => {
      await plpPage.expectBasketCounterValue(2);
    });

    await test.step('Navigate to basket and verify products', async () => {
      await headerComponent.openBasketAndExpectProductsPresent();
      await basketPage.expectBasketElementsPresent();
    });

    await test.step('Verify basket has 2 products', async () => {
      const itemCount = await basketPage.getCartItemsCount();
      await test.expect(itemCount).toBe(2);
    });

    await test.step('Remove one product from basket', async () => {
      const initialCount = await basketPage.getCartItemsCount();
      await basketPage.removeProductAndVerifyRemoved('Sauce Labs Backpack', initialCount);
    });

    await test.step('Verify basket has 1 product remaining', async () => {
      const finalCount = await basketPage.getCartItemsCount();
      await test.expect(finalCount).toBe(1);
    });

    await test.step('Proceed to checkout', async () => {
      await basketPage.clickCheckoutAndExpectNextStep();
    });

    await test.step('Verify checkout step one page and header', async () => {
      await checkoutStepOnePage.expectLoaded();
      await checkoutStepOnePage.expectHeaderVisible();
      await checkoutStepOnePage.expectFormFieldsVisible();
      await checkoutStepOnePage.expectButtonsVisible();
    });

    await test.step('Fill checkout form with user data', async () => {
      await checkoutStepOnePage.fillCheckoutForm(
        userData.checkoutStepOne.firstName,
        userData.checkoutStepOne.lastName,
        userData.checkoutStepOne.postalCode,
      );
    });

    await test.step('Continue to checkout step two', async () => {
      await checkoutStepOnePage.clickContinueAndExpectNextStep();
    });

    await test.step('Verify checkout step two page elements', async () => {
      await checkoutStepTwoPage.expectLoaded();
      await checkoutStepTwoPage.expectHeaderVisible();
      await checkoutStepTwoPage.expectProductDetailsVisible();
      await checkoutStepTwoPage.expectPaymentInfoVisible();
      await checkoutStepTwoPage.expectShippingInfoVisible();
      await checkoutStepTwoPage.expectPriceTotalsVisible();
    });

    await test.step('Complete the order', async () => {
      await checkoutStepTwoPage.clickFinishAndExpectOrderSuccess();
    });

    await test.step('Verify order success page', async () => {
      await checkoutCompletePage.expectLoaded();
      await checkoutCompletePage.expectHeaderVisible();
      await checkoutCompletePage.expectSuccessMessageVisible();
      await checkoutCompletePage.expectBackHomeButtonVisible();
    });

    await test.step('Return to PLP via back home button', async () => {
      await checkoutCompletePage.clickBackHomeAndExpectPLP();
    });

    await test.step('Verify successful return to PLP', async () => {
      await plpPage.expectLoaded();
    });
  });
});