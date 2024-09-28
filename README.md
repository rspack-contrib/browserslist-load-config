# browserslist-load-config

The `browserslist.loadConfig` method exported as a module.

<p>
  <a href="https://npmjs.com/package/browserslist-load-config">
   <img src="https://img.shields.io/npm/v/browserslist-load-config?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/browserslist-load-config?minimal=true"><img src="https://img.shields.io/npm/dm/browserslist-load-config.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## Usage

Install:

```bash
npm add browserslist-load-config -D
```

Add plugin to your `rsbuild.config.ts`:

```ts
// rsbuild.config.ts
import { pluginExample } from "browserslist-load-config";

export default {
  plugins: [pluginExample()],
};
```

## License

[MIT](./LICENSE).
