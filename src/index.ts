import fs from 'node:fs';
import path from 'node:path';

class BrowserslistError extends Error {
  browserslist: boolean;

  constructor(message: string) {
    super(message);
    this.name = 'BrowserslistError';
    this.browserslist = true;
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BrowserslistError);
    }
  }
}

const isFileCache: Record<string, boolean> = {};

function isFile(file: string) {
  if (file in isFileCache) {
    return isFileCache[file];
  }
  const result = fs.existsSync(file) && fs.statSync(file).isFile();
  isFileCache[file] = result;
  return result;
}

function check(section: string | string[]) {
  const FORMAT =
    'Browserslist config should be a string or an array of strings with browser queries';
  if (Array.isArray(section)) {
    for (let i = 0; i < section.length; i++) {
      if (typeof section[i] !== 'string') {
        throw new BrowserslistError(FORMAT);
      }
    }
  } else if (typeof section !== 'string') {
    throw new BrowserslistError(FORMAT);
  }
}

function parsePackage(file: string): Record<string, string[]> {
  const config = JSON.parse(
    fs
      .readFileSync(file)
      .toString()
      .replace(/^\uFEFF/m, ''),
  );
  if (config.browserlist && !config.browserslist) {
    throw new BrowserslistError(
      `\`browserlist\` key instead of \`browserslist\` in ${file}`,
    );
  }
  let list = config.browserslist;
  if (Array.isArray(list) || typeof list === 'string') {
    list = { defaults: list };
  }
  for (const i in list) {
    check(list[i]);
  }

  return list;
}

const IS_SECTION = /^\s*\[(.+)]\s*$/;

function parseConfig(string: string) {
  const result: Record<string, string[]> = { defaults: [] };
  let sections = ['defaults'];

  string
    .toString()
    .replace(/#[^\n]*/g, '')
    .split(/\n|,/)
    .map((line) => line.trim())
    .filter((line) => line !== '')
    .forEach((line) => {
      const matched = line.match(IS_SECTION);
      if (matched) {
        sections = matched[1].trim().split(' ');
        sections.forEach((section) => {
          if (result[section]) {
            throw new BrowserslistError(
              `Duplicate section ${section} in Browserslist config`,
            );
          }
          result[section] = [];
        });
      } else {
        sections.forEach((section) => {
          result[section].push(line);
        });
      }
    });

  return result;
}

function readConfig(file: string) {
  if (!isFile(file)) {
    throw new BrowserslistError(`Can't read ${file} config`);
  }
  return parseConfig(fs.readFileSync(file, 'utf-8'));
}

function parsePackageOrReadConfig(file: string) {
  if (path.basename(file) === 'package.json') {
    return parsePackage(file);
  }
  return readConfig(file);
}

function pickEnv(config: Record<string, string[]>, opts: LoadConfigOptions) {
  if (typeof config !== 'object') {
    return config;
  }

  let name: string;
  if (typeof opts.env === 'string') {
    name = opts.env;
  } else if (process.env.BROWSERSLIST_ENV) {
    name = process.env.BROWSERSLIST_ENV;
  } else if (process.env.NODE_ENV) {
    name = process.env.NODE_ENV;
  } else {
    name = 'production';
  }

  return config[name] || config.defaults;
}

function eachParent(file: string, callback: (dir: string) => void) {
  const dir = isFile(file) ? path.dirname(file) : file;
  let loc = path.resolve(dir);
  do {
    const result = callback(loc);
    if (typeof result !== 'undefined') return result;
  } while (loc !== (loc = path.dirname(loc)));
  return undefined;
}

function findConfigFile(from: string) {
  return eachParent(from, (dir) => {
    const config = path.join(dir, 'browserslist');
    const pkg = path.join(dir, 'package.json');
    const rc = path.join(dir, '.browserslistrc');

    let pkgBrowserslist: Record<string, string[]> | undefined;

    if (isFile(pkg)) {
      try {
        pkgBrowserslist = parsePackage(pkg);
      } catch (e: unknown) {
        if (e instanceof BrowserslistError) throw e;
        console.warn(`[Browserslist] Could not parse ${pkg}. Ignoring it.`);
      }
    }

    if (isFile(config) && pkgBrowserslist) {
      throw new BrowserslistError(
        `${dir} contains both browserslist and package.json with browsers`,
      );
    }
    if (isFile(rc) && pkgBrowserslist) {
      throw new BrowserslistError(
        `${dir} contains both .browserslistrc and package.json with browsers`,
      );
    }
    if (isFile(config) && isFile(rc)) {
      throw new BrowserslistError(
        `${dir} contains both .browserslistrc and browserslist`,
      );
    }
    if (isFile(config)) {
      return config;
    }
    if (isFile(rc)) {
      return rc;
    }
    if (pkgBrowserslist) {
      return pkg;
    }
  });
}

const configCache: Record<string, Record<string, string[]>> = {};

function findConfig(from: string): Record<string, string[]> | undefined {
  from = path.resolve(from);

  const fromDir = isFile(from) ? path.dirname(from) : from;
  if (fromDir in configCache) {
    return configCache[fromDir];
  }

  let resolved: Record<string, string[]> | undefined;
  const configFile = findConfigFile(from);
  if (configFile) {
    resolved = parsePackageOrReadConfig(configFile);
  }

  const configDir = configFile && path.dirname(configFile);
  eachParent(from, (dir) => {
    if (resolved) {
      configCache[dir] = resolved;
    }
    if (dir === configDir) {
      return null;
    }
  });

  return resolved;
}

export type LoadConfigOptions = {
  config?: string;
  path?: string;
  env?: string;
};

export function loadConfig(opts: LoadConfigOptions): string[] | undefined {
  if (opts.config) {
    return pickEnv(parsePackageOrReadConfig(opts.config), opts);
  }

  if (opts.path) {
    const config = findConfig(opts.path);
    if (!config) {
      return undefined;
    }
    return pickEnv(config, opts);
  }
  return undefined;
}
