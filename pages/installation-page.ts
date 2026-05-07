import { expect, type Locator, type Page } from '@playwright/test';
import { installationSelectors } from '../selectors/installation.selectors';
import { urls } from '../test-data/urls';
import { BasePage } from './base-page';

export class InstallationPage extends BasePage {
  readonly heading: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole(installationSelectors.heading.role, {
      name: installationSelectors.heading.name,
    });
  }

  async expectLoaded() {
    await expect(this.page).toHaveURL(urls.docsIntro);
    await expect(this.heading).toBeVisible();
  }
}
