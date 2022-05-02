import { withTests } from '@storybook/addon-jest';
import jestTestResult from '../.jest-test-results.json';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

export const decorators = [
  withTests({
    results: jestTestResult,
    filesExt: '(.*)'
  }),
];