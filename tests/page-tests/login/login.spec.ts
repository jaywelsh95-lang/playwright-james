import { test } from '../../../fixtures/pages.fixture';
import { credentials, invalidCredentials } from '../../../test-data/credentials';

test.describe('Login Page', () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Verify login elements are present', async () => {
      await loginPage.expectLoginElementsVisible();
    });
  });

  test('Successful login with valid credentials', async ({ loginPage }) => {
    await test.step('Login with valid credentials', async () => {
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });
  });

  test('Login fails with both invalid username and password', async ({ loginPage }) => {
    await test.step('Attempt login with invalid credentials', async () => {
      await loginPage.login(invalidCredentials.bothInvalid.username, invalidCredentials.bothInvalid.password);
      await loginPage.expectLoginFailed();
    });
  });

  test('Login fails with correct username but invalid password', async ({ loginPage }) => {
    await test.step('Attempt login with invalid password', async () => {
      await loginPage.login(
        invalidCredentials.invalidPassword.username,
        invalidCredentials.invalidPassword.password,
      );
      await loginPage.expectLoginFailed();
    });
  });

  test('Login fails with invalid username but correct password', async ({ loginPage }) => {
    await test.step('Attempt login with invalid username', async () => {
      await loginPage.login(
        invalidCredentials.invalidUsername.username,
        invalidCredentials.invalidUsername.password,
      );
      await loginPage.expectLoginFailed();
    });
  });
});
