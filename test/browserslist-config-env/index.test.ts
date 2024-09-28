import { expect } from 'vitest';
import { test } from 'vitest';
import { loadConfig } from '../../src';

test('load browserslist from .browserslistrc with env: development', () => {
  expect(loadConfig({ path: __dirname, env: 'development' })).toEqual([
    'last 1 chrome version',
    'last 1 firefox version',
    'last 1 safari version',
  ]);
});

test('load browserslist from .browserslistrc with env: production', () => {
  expect(loadConfig({ path: __dirname, env: 'production' })).toEqual([
    'chrome >= 87',
    'edge >= 88',
    'firefox >= 78',
    'safari >= 14',
  ]);
});
