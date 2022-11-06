# vite-plugin-browserslist-useragent

[![npm version](https://img.shields.io/npm/v/vite-plugin-browserslist-useragent)](https://www.npmjs.com/package/vite-plugin-browserslist-useragent)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg)](https://gitmoji.dev)

A vite plugin wrapping [browserslist-useragent-regexp](https://github.com/browserslist/browserslist-useragent-regexp) which provides utility RegExps compiled by [browserslist query](https://github.com/browserslist/browserslist#queries) to test browser useragent.

Simplest example: you can detect supported browsers on client-side.

1. Create `.browserslistrc` config, for example like this:

```
last 2 versions
not dead
```

2. Add plugin to `vite.config.m*`:
   > Since v0.2.0, this plugin only supports ESM as `browserslist-useragent-regexp` [dropped support for CJS](https://github.com/browserslist/browserslist-useragent-regexp/commit/41456bc22b789fee57384a00abb64e0690ded08a). If you want to use CJS version, install v0.1.0 instead.

```ts
// vite.config.mts
import SupportedBrowsers from 'vite-plugin-browserslist-useragent'
export default defineConfig({
  plugins: [SupportedBrowsers(/* options */)],
})
```

3. Import RegExp from virtual module:

```js
import { browsersRegex } from 'virtual:supported-browsers'

if (browsersRegex.test(navigator.userAgent)) {
  alert('Your browser is supported.')
}
```

Auto-generated `virtual:supported-browsers`:

```js
export const browsersRegex =
  /Edge?\/(10[5-9]|1[1-9]\d|[2-9]\d\d|\d{4,})(\.\d+|)(\.\d+|)|Firefox\/(10[4-9]|1[1-9]\d|[2-9]\d\d|\d{4,})\.\d+(\.\d+|)|Chrom(ium|e)\/(10[5-9]|1[1-9]\d|[2-9]\d\d|\d{4,})\.\d+(\.\d+|)|Maci.* Version\/(15\.([6-9]|\d{2,})|(1[6-9]|[2-9]\d|\d{3,})\.\d+)([,.]\d+|)( Mobile\/\w+|) Safari\/|Chrome.+OPR\/(9\d|\d{3,})\.\d+\.\d+|(CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS|CPU iPad OS)[ +]+(15[._]([6-9]|\d{2,})|(1[6-9]|[2-9]\d|\d{3,})[._]\d+)([._]\d+|)|Opera Mini|Android:?[ /\-](10[6-9]|1[1-9]\d|[2-9]\d{2}|\d{4,})(\.\d+|)(\.\d+|)|Mobile Safari.+OPR\/(6[4-9]|[7-9]\d|\d{3,})\.\d+\.\d+|Android.+Firefox\/(10[5-9]|1[1-9]\d|[2-9]\d\d|\d{4,})\.\d+(\.\d+|)|Android.+Chrom(ium|e)\/(10[6-9]|1[1-9]\d|[2-9]\d\d|\d{4,})\.\d+(\.\d+|)|Android.+(UC? ?Browser|UCWEB|U3)[ /]?(13\.([4-9]|\d{2,})|(1[4-9]|[2-9]\d|\d{3,})\.\d+)\.\d+|SamsungBrowser\/(1[7-9]|[2-9]\d|\d{3,})\.\d+|Android.+MQQBrowser\/(13(\.([1-9]|\d{2,})|)|(1[4-9]|[2-9]\d|\d{3,})(\.\d+|))(\.\d+|)|K[Aa][Ii]OS\/(2\.([5-9]|\d{2,})|([3-9]|\d{2,})\.\d+)(\.\d+|)/
export const browsersRegexes = [
  {
    family: 'edge',
    sourceRegex: {},
    sourceRegexString: 'Edge?\\/(\\d+)(\\.(\\d+)|)(\\.(\\d+)|)',
    regex: {},
    requestVersions: [
      [105, 0, 0],
      [106, 0, 0],
    ],
    requestVersionsStrings: ['105.0.0', '106.0.0'],
    regexString: 'Edge?\\/(105|106)(\\.0|)(\\.\\d+|)',
  },
  /* ... */
]
```

## Install

```bash
pnpm add -D vite-plugin-browserslist-useragent
# or
npm i -D vite-plugin-browserslist-useragent
# or
yarn add -D vite-plugin-browserslist-useragent
```

## Why?

https://github.com/browserslist/browserslist-useragent-regexp#why

### Why wrap `browserslist-useragent-regexp` with vite plugin?

Let [Vite](https://github.com/vitejs/vite) transform and bundle for you and no need to run CLI every time you change browserslist.

`browserslist-useragent-regexp` and its dependency [`useragent`](https://github.com/3rd-Eden/useragent) are no longer actively maintained. This plugin will patch and override deprecated dependencies.

## Virtual Module

Virtual module `virtual:supported-browsers` exposes two variables returned by the following two methods of `browserslist-useragent-regexp` whose arguments are passed from plugin's [options](#options):

### [getUserAgentRegex(options)=> browsersRegexp: RegExp](https://browserslist.github.io/browserslist-useragent-regexp/functions/getUserAgentRegex.html)

Compile browserslist query to one regex.

### [getUserAgentRegexs(options)=> browsersRegexps: BrowserVersionedRegex[]](https://browserslist.github.io/browserslist-useragent-regexp/functions/getUserAgentRegexes.html)

Compile browserslist query to [regexes for each browser](#regexp-info-object).

#### Options

| Option               | Type                 | Default | Description                                                                                                                                              |
| -------------------- | -------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| browsers             | `string \| string[]` | —       | Manually provide a browserslist query (or an array of queries). Specifying this overrides the browserslist configuration specified in your project.      |
| env                  | `string`             | —       | When multiple browserslist [environments](https://github.com/ai/browserslist#environments) are specified, pick the config belonging to this environment. |
| ignorePatch          | `boolean`            | `true`  | Ignore differences in patch browser numbers.                                                                                                             |
| ignoreMinor          | `boolean`            | `false` | Ignore differences in minor browser versions.                                                                                                            |
| allowHigherVersions  | `boolean`            | `false` | For all the browsers in the browserslist query, return a match if the useragent version is equal to or higher than the one specified in browserslist.    |
| allowZeroSubversions | `boolean`            | `false` | Ignore match of patch or patch and minor, if they are 0.                                                                                                 |

#### RegExp info object

| Property        | Type                               | Description                                        |
| --------------- | ---------------------------------- | -------------------------------------------------- |
| family          | `string`                           | Browser family.                                    |
| requestVersions | `[number, number, number][]`       | Versions provided by browserslist.                 |
| regex           | `RegExp`                           | Regex to match useragent with family and versions. |
| sourceRegex     | `RegExp`                           | Original useragent regex, without versions.        |
| version         | `[number, number, number] \| null` | Useragent version of regex.                        |
| minVersion      | `[number, number, number] \| null` | Useragent min version of regex.                    |
| maxVersion      | `[number, number, number] \| null` | Useragent max version of regex.                    |

### Client Types

If you want type definition of `virtual:supported-browsers`, add `vite-plugin-browserslist-useragent/client` to `compilerOptions.types` of your `tsconfig`:

```json
{
  "compilerOptions": {
    "types": ["vite-plugin-browserslist-useragent/client"]
  }
}
```

## License

[MIT](./LICENSE) License © 2022 Yue JIN
