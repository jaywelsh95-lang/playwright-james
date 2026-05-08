import { expect, test } from '../../../../fixtures/pages.fixture';
import { credentials } from '../../../../test-data/credentials';
import { userData } from '../../../../test-data/userData';

test.describe('Checkout Step One', () => {
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

  test('Header is present on checkout step one page', async ({ checkoutStepOnePage }) => {
    await test.step('Verify header elements are visible', async () => {
      await checkoutStepOnePage.expectHeaderVisible();
    });
  });

  test('Checkout step one form fields are present', async ({ checkoutStepOnePage }) => {
    await test.step('Verify input fields are visible', async () => {
      await checkoutStepOnePage.expectFormFieldsVisible();
    });
  });

  test('Cancel and continue buttons are present', async ({ checkoutStepOnePage }) => {
    await test.step('Verify cancel and continue buttons are visible', async () => {
      await checkoutStepOnePage.expectButtonsVisible();
    });
  });

  test('Can fill checkout step one user details', async ({ checkoutStepOnePage }) => {
    await test.step('Fill checkout forms with user data', async () => {
      await checkoutStepOnePage.fillCheckoutForm(
        userData.checkoutStepOne.firstName,
        userData.checkoutStepOne.lastName,
        userData.checkoutStepOne.postalCode,
      );
    });

    await test.step('Verify form values were entered', async () => {
      await expect(checkoutStepOnePage.firstNameInput).toHaveValue(userData.checkoutStepOne.firstName);
      await expect(checkoutStepOnePage.lastNameInput).toHaveValue(userData.checkoutStepOne.lastName);
      await expect(checkoutStepOnePage.postalCodeInput).toHaveValue(userData.checkoutStepOne.postalCode);
    });
  });

  test('Continue button advances to checkout step two', async ({ checkoutStepOnePage }) => {
    await test.step('Fill checkout user details', async () => {
      await checkoutStepOnePage.fillCheckoutForm(
        userData.checkoutStepOne.firstName,
        userData.checkoutStepOne.lastName,
        userData.checkoutStepOne.postalCode,
      );
    });

    await test.step('Click continue and verify next page', async () => {
      await checkoutStepOnePage.clickContinueAndExpectNextStep();
    });
  });
});
