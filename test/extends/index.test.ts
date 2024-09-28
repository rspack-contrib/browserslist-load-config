import { expect } from 'vitest';
import { test } from 'vitest';
import { loadConfig } from '../../src';

test('load browserslist with extends', () => {
  expect(loadConfig({ path: __dirname })).toEqual([
    'extends browserslist-config-test',
  ]);
});
