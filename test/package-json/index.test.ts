import { expect } from 'vitest';
import { test } from 'vitest';
import { loadConfig } from '../../src';

test('load browserslist from package.json', () => {
  expect(loadConfig({ path: __dirname })).toEqual([
    'last 2 versions',
    'not ie <= 11',
    'not ie_mob <= 11',
  ]);
});
