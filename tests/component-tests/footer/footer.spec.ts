import { test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';
import { userData } from '../../../test-data/user-data';

test.describe('Footer', () => {
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

  test('Footer elements and social links are present on the PLP', async ({ footerComponent }) => {
    await test.step('Verify footer elements are visible', async () => {
      await footerComponent.expectSwagLabsFooterVisible();
    });

    await test.step('Verify footer social links are present', async () => {
      await footerComponent.expectSocialLinksPresent();
    });
  });

  test('Footer elements are present on the PDP', async ({ plpPage, pdpPage, footerComponent }) => {
    await test.step('Navigate to PDP', async () => {
      await pdpPage.openFromPLP(plpPage, 'Sauce Labs Backpack');
    });

    await test.step('Verify footer elements are visible', async () => {
      await footerComponent.expectSwagLabsFooterVisible();
    });
  });

  test('Footer elements are present on the basket page', async ({
    plpPage,
    headerComponent,
    basketPage,
    footerComponent,
  }) => {
    await test.step('Add a product and navigate to basket', async () => {
      await plpPage.addProductToBasket('Sauce Labs Backpack');
      await headerComponent.openBasketAndExpectProductsPresent();
      await basketPage.expectLoaded();
    });

    await test.step('Verify footer elements are visible', async () => {
      await footerComponent.expectSwagLabsFooterVisible();
    });
  });

  test('Footer elements are present during checkout', async ({
    plpPage,
    headerComponent,
    basketPage,
    checkoutStepOnePage,
    checkoutStepTwoPage,
    checkoutCompletePage,
    footerComponent,
  }) => {
    await test.step('Navigate to checkout step one', async () => {
      await plpPage.addProductToBasket('Sauce Labs Backpack');
      await headerComponent.openBasketAndExpectProductsPresent();
      await basketPage.clickCheckoutAndExpectNextStep();
      await checkoutStepOnePage.expectLoaded();
    });

    await test.step('Verify footer elements are visible on checkout step one', async () => {
      await footerComponent.expectSwagLabsFooterVisible();
    });

    await test.step('Navigate to checkout step two', async () => {
      await checkoutStepOnePage.fillCheckoutForm(
        userData.checkoutStepOne.firstName,
        userData.checkoutStepOne.lastName,
        userData.checkoutStepOne.postalCode,
      );
      await checkoutStepOnePage.clickContinueAndExpectNextStep();
      await checkoutStepTwoPage.expectLoaded();
    });

    await test.step('Verify footer elements are visible on checkout step two', async () => {
      await footerComponent.expectSwagLabsFooterVisible();
    });

    await test.step('Complete checkout', async () => {
      await checkoutStepTwoPage.clickFinishAndExpectOrderSuccess();
      await checkoutCompletePage.expectLoaded();
    });

    await test.step('Verify footer elements are visible on checkout complete', async () => {
      await footerComponent.expectSwagLabsFooterVisible();
    });
  });
});
