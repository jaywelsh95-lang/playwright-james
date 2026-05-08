import { getEnv, getTargetEnvironment, type TestEnvironment } from '../utils/env';

type EnvironmentUrls = {
  sauceDemo: string;
};

const urlByEnvironment: Record<TestEnvironment, EnvironmentUrls> = {
  int: {
    sauceDemo: getEnv('INT_SAUCE_DEMO_URL', 'https://www.saucedemo.com/'),
  },
  staging: {
    sauceDemo: getEnv('STAGING_SAUCE_DEMO_URL', 'https://www.saucedemo.com/'),
  },
  production: {
    sauceDemo: getEnv('PRODUCTION_SAUCE_DEMO_URL', 'https://www.saucedemo.com/'),
  },
};

const environmentUrls = urlByEnvironment[getTargetEnvironment()];

export const urls = {
  home: getEnv('SAUCE_DEMO_URL', environmentUrls.sauceDemo),
  docsIntro: /.*\/docs\/intro/,
  cart: /.*\/cart\.html/,
};
