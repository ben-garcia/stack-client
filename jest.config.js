module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['/components/**/*test.(ts|tsx)', '**/?(*.)+(test).+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  moduleNameMapper: { '\\.(scss)$': '<rootDir>/src/__mocks__/styles.ts' },
};
