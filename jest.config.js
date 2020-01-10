module.exports = {
  moduleDirectories: ['node_modules', 'src'],
  roots: ['<rootDir>/src'],
  testMatch: ['/components/**/*test.tsx', '**/?(*.)+(test).+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  setupFilesAfterEnv: ['./setupTests.ts'],
  testPathIgnorePatterns: [
    '/node_modules',
    '<rootDir>/.storybook',
    '<rootDir>/setupTests.ts',
  ],
  moduleNameMapper: {
    '\\.(scss)$': '<rootDir>/src/__mocks__/styles.ts',
    '\\.svg': '<rootDir>/src/__mocks__/svgTransform.ts',
  },
};
