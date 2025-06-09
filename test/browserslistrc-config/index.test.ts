import { expect } from '@rstest/core';
import { test } from '@rstest/core';
import { loadConfig } from '../../dist';

test('load browserslist from .browserslistrc', () => {
  expect(loadConfig({ path: __dirname })).toEqual([
    'iOS >= 9',
    'Android >= 4.4',
    'last 2 versions',
    '> 0.2%',
    'not dead',
  ]);
});
