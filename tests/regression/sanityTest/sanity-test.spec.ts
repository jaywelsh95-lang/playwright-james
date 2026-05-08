import { test } from '../../../fixtures/pages.fixture';
import { credentials } from '../../../test-data/credentials';

test.describe('Sanity Test', () => {
  test('Basic PLP functionality verification', async ({ loginPage, plpPage }) => {
    await test.step('Navigate to login page', async () => {
      await loginPage.goto();
    });

    await test.step('Login with valid credentials', async () => {
      await loginPage.login(credentials.standardUser.username, credentials.standardUser.password);
      await loginPage.expectLoginSuccessful();
    });

    await test.step('Verify PLP is loaded with basic content', async () => {
      await plpPage.expectLoaded();
    });
  });
});