import { test } from '../../../fixtures/pages.fixture';
import { invalidCredentials } from '../../../test-data/credentials';

test.describe.serial('Swag Labs - Invalid Credentials Login', () => {
  test('Login fails with both invalid username and password', async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Verify login elements are present', async () => {
      await loginPage.expectLoginElementsVisible();
    });

    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(invalidCredentials.bothInvalid.username, invalidCredentials.bothInvalid.password);
      await loginPage.expectLoginFailed();
    });
  });
});
