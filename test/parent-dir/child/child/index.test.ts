import { expect } from 'vitest';
import { test } from 'vitest';
import { loadConfig } from '../../../../src';

test("load browserslist from parent's parent dir", () => {
  expect(loadConfig({ path: __dirname, env: 'development' })).toEqual([
    'last 3 chrome version',
  ]);

  expect(loadConfig({ path: __dirname, env: 'production' })).toEqual([
    'chrome >= 66',
  ]);
});
