import { test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';

test.describe('Header', () => {
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

  test('Header elements are present on the PLP', async ({ headerComponent }) => {
    await test.step('Verify header elements are visible', async () => {
      await headerComponent.expectSwagLabsHeaderVisible();
    });
  });

  test('Header basket counter updates after adding a product', async ({
    plpPage,
    headerComponent,
  }) => {
    await test.step('Add a product to the basket', async () => {
      await plpPage.addProductToBasket('Sauce Labs Backpack');
    });

    await test.step('Verify basket counter updates', async () => {
      await headerComponent.expectShoppingCartBadgeCount('1');
    });
  });

  test('Header basket link opens the basket page', async ({ plpPage, headerComponent }) => {
    await test.step('Add a product to the basket', async () => {
      await plpPage.addProductToBasket('Sauce Labs Backpack');
    });

    await test.step('Open basket from header', async () => {
      await headerComponent.openBasketAndExpectProductsPresent();
    });
  });
});
