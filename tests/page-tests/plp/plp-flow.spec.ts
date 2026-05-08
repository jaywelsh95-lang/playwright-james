import { test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';

const productsToAdd = ['Sauce Labs Backpack', 'Sauce Labs Bike Light'];

test.describe('PLP - Product Listing Page', () => {
  test.beforeEach(async ({ loginPage, plpPage }) => {
    await test.step('Login as a standard user', async () => {
      await loginPage.goto();
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });

    await test.step('Verify PLP is loaded', async () => {
      await plpPage.expectLoaded();
    });
  });

  test('User can add products to basket and see the mini cart counter increase', async ({
    plpPage,
  }) => {
    await test.step('Check PLP content is present', async () => {
      await plpPage.checkContentLoaded();
    });

    for (const [index, productName] of productsToAdd.entries()) {
      const expectedBasketCount = index + 1;

      await test.step(`Add ${productName} and verify mini cart counter is ${expectedBasketCount}`, async () => {
        await plpPage.addProductToBasketAndExpectCounter(productName, expectedBasketCount);
      });
    }
  });

  test('User can remove a product from basket and see the mini cart counter decrease', async ({
    plpPage,
  }) => {
    const [firstProduct, secondProduct] = productsToAdd;

    await test.step(`Add ${firstProduct} and verify mini cart counter is 1`, async () => {
      await plpPage.addProductToBasketAndExpectCounter(firstProduct, 1);
    });

    await test.step(`Add ${secondProduct} and verify mini cart counter is 2`, async () => {
      await plpPage.addProductToBasketAndExpectCounter(secondProduct, 2);
    });

    await test.step(`Remove ${firstProduct} and verify mini cart counter is 1`, async () => {
      await plpPage.removeProductFromBasketAndExpectCounter(firstProduct, 1);
    });
  });
});
