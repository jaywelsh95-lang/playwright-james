import { test as base } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { BasketPage } from '../pages/basket-page';
import { CheckoutCompletePage } from '../pages/checkout/checkoutCompletePage';
import { CheckoutStepOnePage } from '../pages/checkout/checkoutStepOnePage';
import { CheckoutStepTwoPage } from '../pages/checkout/checkoutStepTwoPage';
import { HomePage } from '../pages/home-page';
import { InstallationPage } from '../pages/installation-page';
import { LoginPage } from '../pages/login-page';
import { PLPPage } from '../pages/plp-page';

type PageFixtures = {
  homePage: HomePage;
  installationPage: InstallationPage;
  loginPage: LoginPage;
  plpPage: PLPPage;
  basketPage: BasketPage;
  checkoutStepOnePage: CheckoutStepOnePage;
  checkoutStepTwoPage: CheckoutStepTwoPage;
  checkoutCompletePage: CheckoutCompletePage;
  headerComponent: HeaderComponent;
};

export const test = base.extend<PageFixtures>({
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },

  installationPage: async ({ page }, use) => {
    await use(new InstallationPage(page));
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  plpPage: async ({ page }, use) => {
    await use(new PLPPage(page));
  },

  basketPage: async ({ page }, use) => {
    await use(new BasketPage(page));
  },

  checkoutStepOnePage: async ({ page }, use) => {
    await use(new CheckoutStepOnePage(page));
  },

  checkoutStepTwoPage: async ({ page }, use) => {
    await use(new CheckoutStepTwoPage(page));
  },

  checkoutCompletePage: async ({ page }, use) => {
    await use(new CheckoutCompletePage(page));
  },

  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
});

export { expect } from '@playwright/test';
