const { spawnSync } = require('node:child_process');
const path = require('node:path');

const supportedEnvironments = ['int', 'staging', 'production'];
const [environment = 'production', ...playwrightArgs] = process.argv.slice(2);

if (!supportedEnvironments.includes(environment)) {
  console.error(
    `Unsupported environment "${environment}". Use one of: ${supportedEnvironments.join(', ')}.`,
  );
  process.exit(1);
}

process.env.TEST_ENV = environment;

const command = path.join(
  process.cwd(),
  'node_modules',
  '.bin',
  process.platform === 'win32' ? 'playwright.cmd' : 'playwright',
);

const result = spawnSync(command, ['test', ...playwrightArgs], {
  env: process.env,
  shell: process.platform === 'win32',
  stdio: 'inherit',
});

if (result.error) {
  console.error(result.error.message);
}

process.exit(result.status ?? 1);
