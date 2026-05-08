import { expect, type Locator, type Page } from '@playwright/test';
import { footerSelectors } from '../selectors/footer.selectors';

export class FooterComponent {
  readonly footerContainer: Locator;
  readonly twitterLink: Locator;
  readonly facebookLink: Locator;
  readonly linkedinLink: Locator;
  readonly footerCopy: Locator;

  constructor(page: Page) {
    this.footerContainer = page.locator(footerSelectors.footerContainer);
    this.twitterLink = page.locator(footerSelectors.twitterLink);
    this.facebookLink = page.locator(footerSelectors.facebookLink);
    this.linkedinLink = page.locator(footerSelectors.linkedinLink);
    this.footerCopy = page.locator(footerSelectors.footerCopy);
  }

  async expectSwagLabsFooterVisible() {
    await expect(this.footerContainer).toBeVisible();
    await expect(this.twitterLink).toBeVisible();
    await expect(this.facebookLink).toBeVisible();
    await expect(this.linkedinLink).toBeVisible();
    await expect(this.footerCopy).toBeVisible();
    await expect(this.footerCopy).toContainText('Sauce Labs');
  }

  async expectSocialLinksPresent() {
    await expect(this.twitterLink).toHaveAttribute('href', /twitter\.com\/saucelabs/);
    await expect(this.facebookLink).toHaveAttribute('href', /facebook\.com\/saucelabs/);
    await expect(this.linkedinLink).toHaveAttribute('href', /linkedin\.com\/company\/sauce-labs/);
  }
}
