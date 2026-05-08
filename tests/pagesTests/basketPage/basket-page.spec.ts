import { expect, test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';

test.describe('Basket Page', () => {
  test.beforeEach(async ({ loginPage, plpPage, basketPage, headerComponent }) => {
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

    await test.step('Add first product to basket', async () => {
      await plpPage.addProductToBasket('Sauce Labs Backpack');
    });

    await test.step('Add second product to basket', async () => {
      await plpPage.addProductToBasket('Sauce Labs Bike Light');
    });

    await test.step('Navigate to basket', async () => {
      await headerComponent.openBasketAndExpectProductsPresent();
    });
  });

  test('Header elements are present on the basket page', async ({ basketPage }) => {
    await test.step('Verify header elements are visible', async () => {
      await basketPage.expectHeaderVisible();
    });
  });

  test('Basket page elements are present', async ({ basketPage }) => {
    await test.step('Verify basket elements are visible', async () => {
      await basketPage.expectBasketElementsPresent();
    });
  });

  test('User can remove a product from the basket', async ({ basketPage }) => {
    await test.step('Get initial basket items count', async () => {
      const initialCount = await basketPage.getCartItemsCount();
      await expect(initialCount).toBe(2);
    });

    await test.step('Remove a product from basket', async () => {
      const initialCount = await basketPage.getCartItemsCount();
      await basketPage.removeProductAndVerifyRemoved('Sauce Labs Backpack', initialCount);
    });

    await test.step('Verify only one product remains in basket', async () => {
      const finalCount = await basketPage.getCartItemsCount();
      await expect(finalCount).toBe(1);
    });
  });

  test('Checkout continues to the next step', async ({ basketPage }) => {
    await test.step('Click checkout', async () => {
      await basketPage.clickCheckoutAndExpectNextStep();
    });
  });
});
