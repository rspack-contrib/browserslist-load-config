import { expect } from 'vitest';
import { test } from 'vitest';
import { loadConfig } from '../../dist';

test('load string browserslist from package.json', () => {
  expect(loadConfig({ path: __dirname })).toEqual(['last 2 versions', '> 1%']);
});
