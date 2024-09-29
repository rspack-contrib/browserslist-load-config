import { expect } from 'vitest';
import { test } from 'vitest';
import { findConfig, loadConfig } from '../../src';

test('load browserslist from .browserslistrc', () => {
  expect(loadConfig({ path: __dirname })).toEqual([
    'iOS >= 9',
    'Android >= 4.4',
    'last 2 versions',
    '> 0.2%',
    'not dead',
  ]);

  expect(findConfig(__dirname)).toEqual({
    defaults: [
      'iOS >= 9',
      'Android >= 4.4',
      'last 2 versions',
      '> 0.2%',
      'not dead',
    ],
  });
});
