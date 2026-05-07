import { test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';

test.describe.serial('Swag Labs - Happy Path Login', () => {
  test('Successful login with valid credentials', async ({ loginPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Verify login elements are present', async () => {
      await loginPage.expectLoginElementsVisible();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });
  });
});
