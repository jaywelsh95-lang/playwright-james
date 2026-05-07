import { test } from '../../../fixtures/pages.fixture';
import { invalidCredentials } from '../../../test-data/credentials';

test.describe.serial('Swag Labs - Invalid Username Login', () => {
  test('Login fails with invalid username but correct password', async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Verify login elements are present', async () => {
      await loginPage.expectLoginElementsVisible();
    });

    await test.step('Attempt login with invalid username', async () => {
      await loginPage.login(invalidCredentials.invalidUsername.username, invalidCredentials.invalidUsername.password);
      await loginPage.expectLoginFailed();
    });
  });
});
