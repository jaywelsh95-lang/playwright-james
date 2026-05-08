import { expect, test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';

test.describe('Product Details Page (PDP)', () => {
  test.beforeEach(async ({ loginPage, plpPage, pdpPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });

    await test.step('Navigate to PDP via PLP', async () => {
      await pdpPage.openFromPLP(plpPage, 'Sauce Labs Backpack');
    });
  });

  test('Product content is visible on PDP', async ({ pdpPage }) => {
    await test.step('Verify product details are visible', async () => {
      await pdpPage.expectProductContentVisible();
    });
  });

  test('Add to cart button is present on PDP', async ({ pdpPage }) => {
    await test.step('Verify add to cart button is visible', async () => {
      await expect(pdpPage.addToCartButton).toBeVisible();
    });
  });

  test('Can add product to cart from PDP', async ({ pdpPage }) => {
    await test.step('Add product to cart', async () => {
      await pdpPage.addProductToCart();
    });

    await test.step('Verify basket counter updates', async () => {
      await pdpPage.headerComponent.expectShoppingCartBadgeCount('1');
    });
  });
});
