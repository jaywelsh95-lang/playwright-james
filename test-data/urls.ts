import { getEnv } from '../utils/env';

export const urls = {
  home2: getEnv('SAUCE_DEMO_URL', 'https://www.saucedemo.com/'),
  home: getEnv('PLAYWRIGHT_BASE_URL', 'https://playwright.dev/'),
  docsIntro: /.*\/docs\/intro/,
  cart: /.*\/cart\.html/,
};
