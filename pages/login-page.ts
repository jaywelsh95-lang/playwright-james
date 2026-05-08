import { expect, type Page } from '@playwright/test';
import { loginPageSelectors } from '../selectors/login.selectors';
import { urls } from '../test-data/urls';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto(urls.home2);
  }

  async login(username: string, password: string) {
    await this.page.fill(loginPageSelectors.usernameInput, username);
    await this.page.fill(loginPageSelectors.passwordInput, password);
    await this.page.click(loginPageSelectors.loginButton);
  }

  async expectLoginElementsVisible() {
    await expect(this.page.locator(loginPageSelectors.loginButton)).toBeVisible();
    await expect(this.page.locator(loginPageSelectors.usernameInput)).toBeVisible();
    await expect(this.page.locator(loginPageSelectors.passwordInput)).toBeVisible();
  }

  async expectLoginSuccessful() {
    await this.page.waitForURL('**/inventory.html');
    // Wait for inventory page content to load
    await expect(this.page.locator('.inventory_container')).toBeVisible();
    await expect(this.page.locator('.inventory_item')).toHaveCount(6); // Sauce Demo has 6 products
  }

  async expectLoginFailed() {
    await expect(this.page.locator('[data-test="error"]')).toBeVisible();
  }
}
