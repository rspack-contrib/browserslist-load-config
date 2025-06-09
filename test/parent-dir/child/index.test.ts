import { expect } from '@rstest/core';
import { test } from '@rstest/core';
import { loadConfig } from '../../../src';

test('load browserslist from parent dir', () => {
  expect(loadConfig({ path: __dirname, env: 'development' })).toEqual([
    'last 3 chrome version',
  ]);

  expect(loadConfig({ path: __dirname, env: 'production' })).toEqual([
    'chrome >= 66',
  ]);
});
