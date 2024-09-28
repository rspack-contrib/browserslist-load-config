# browserslist-load-config

<p>
  <a href="https://npmjs.com/package/browserslist-load-config">
   <img src="https://img.shields.io/npm/v/browserslist-load-config?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/browserslist-load-config?minimal=true"><img src="https://img.shields.io/npm/dm/browserslist-load-config.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## Introduction

This package is a fork of [browserslist.loadConfig](https://github.com/browserslist/browserslist) with some modifications to make it faster.

Compare to `browserslist.loadConfig`, this package has the following improvements and differences:

- **27 times** smaller bundle size
- **140 times** smaller install size.
- Zero dependencies.
- Written in TypeScript.
- Smaller and faster.
- Does not support env variables.

> See [bundlephobia - browserslist-load-config](https://bundlephobia.com/package/browserslist-load-config) vs [bundlephobia - browserslist](https://bundlephobia.com/package/browserslist) for bundle size comparison.

> See [packagephobia - browserslist-load-config](https://packagephobia.com/result?p=browserslist-load-config) vs [packagephobia - browserslist](https://packagephobia.com/result?p=browserslist) for install size comparison.  

## Credits

Thanks [Andrey Sitnik](https://github.com/ai) for creating the [Browserslist](https://github.com/browserslist/browserslist) which is under [MIT License](https://github.com/browserslist/browserslist/blob/main/LICENSE).

## Usage

Install:

```bash
npm add browserslist-load-config -D
```

Example:

```ts
const config = browserslist.loadConfig({
  /**
   * Specify the path to the configuration file, can be a relative or absolute path
   */
  config: "./path/to/config/file",

  /**
   * Specify the directory where the configuration file is located
   */
  path: "./path/to/project/root",

  /**
   * Specify the environment to load
   * @default "production"
   */
  env: "production",
});

console.log(config);
```

If both `config` and `path` are provided, `config` will be used.

## License

[MIT](./LICENSE).
