import { expect, type Page } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { urls } from '../test-data/urls';
import { BasePage } from './base-page';

export class HomePage extends BasePage {
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page);
    this.header = new HeaderComponent(page);
  }

  async goto() {
    await super.goto(urls.home);
  }

  async expectLoaded() {
    await expect(this.page).toHaveTitle(/Playwright/);
  }

}
