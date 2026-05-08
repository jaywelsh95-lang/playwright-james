export const testEnvironments = ['int', 'staging', 'production'] as const;

export type TestEnvironment = (typeof testEnvironments)[number];

const defaultEnvironment: TestEnvironment = 'production';

export function getEnv(name: string, fallback: string) {
  return process.env[name] ?? fallback;
}

export function getTargetEnvironment(): TestEnvironment {
  const requestedEnvironment = process.env.TEST_ENV ?? defaultEnvironment;

  if (testEnvironments.includes(requestedEnvironment as TestEnvironment)) {
    return requestedEnvironment as TestEnvironment;
  }

  throw new Error(
    `Unsupported TEST_ENV "${requestedEnvironment}". Use one of: ${testEnvironments.join(', ')}.`,
  );
}
