import { test } from '../../../fixtures/pages.fixture';
import { invalidCredentials } from '../../../test-data/credentials';

test.describe.serial('Swag Labs - Invalid Password Login', () => {
  test('Login fails with correct username but invalid password', async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Verify login elements are present', async () => {
      await loginPage.expectLoginElementsVisible();
    });

    await test.step('Attempt login with invalid password', async () => {
      await loginPage.login(invalidCredentials.invalidPassword.username, invalidCredentials.invalidPassword.password);
      await loginPage.expectLoginFailed();
    });
  });
});
