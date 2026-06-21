import type { Config } from 'jest';
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you soon)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/index.{js,ts,tsx}',
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/src/types/',
    '/src/components/ThemeManager/ThemeManagerTypes.ts',
    '/src/components/PageWrapper/PageWrapper.tsx',
    '/.next/',
    '/coverage/',
    '/src/proxy.ts',
  ],
  testPathIgnorePatterns: ['/node_modules/', '/.next/', '/coverage/'],
  coverageReporters: ['json', 'lcov', 'text-summary'],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
