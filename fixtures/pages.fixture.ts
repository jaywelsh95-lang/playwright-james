import { test as base } from '@playwright/test';
import { HeaderComponent } from '../components/header.component';
import { HomePage } from '../pages/home-page';
import { InstallationPage } from '../pages/installation-page';
import { LoginPage } from '../pages/login-page';
import { PLPPage } from '../pages/plp-page';

type PageFixtures = {
  homePage: HomePage;
  installationPage: InstallationPage;
  loginPage: LoginPage;
  plpPage: PLPPage;
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

  headerComponent: async ({ page }, use) => {
    await use(new HeaderComponent(page));
  },
});

export { expect } from '@playwright/test';
