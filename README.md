# vite-plugin-browserslist-useragent

[![npm version](https://img.shields.io/npm/v/vite-plugin-browserslist-useragent)](https://www.npmjs.com/package/vite-plugin-browserslist-useragent)
[![Code style: Prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg)](https://github.com/RichardLitt/standard-readme)
[![gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg)](https://gitmoji.dev)

A vite plugin wrapping [browserslist-useragent-regexp](https://github.com/browserslist/browserslist-useragent-regexp) which provides utility RegExps compiled by [browserslist query](https://github.com/browserslist/browserslist#queries) to test browser useragent.

Simplest example: you can detect supported browsers on client-side.

1) Create `.browserslistrc` config, for example like this:

```
last 2 versions
not dead
```

2) Add plugin to `vite.config.*`:

```ts
// vite.config.ts
import SupportedBrowsers from 'vite-plugin-browserslist-useragent'
export default defineConfig({
  plugins: [
    SupportedBrowsers(/* options */),
  ],
})

```

3) Import RegExp from virtual module:

```js
import { browsersRegexp } from 'virtual:supported-browsers'

if (browsersRegexp.test(navigator.userAgent)) {
    alert('Your browser is supported.');
}
```

Auto-generated `virtual:supported-browsers`:

```js
export const browsersRegexp = /((CPU[ +]OS|iPhone[ +]OS|CPU[ +]iPhone|CPU IPhone OS)[ +]+(11[_\.](3|4)|12[_\.](0|1))(?:[_\.]\d+)?)|(OperaMini(?:\/att)?\/?(\d+)?(?:\.\d+)?(?:\.\d+)?)|(Opera\/.+Opera Mobi.+Version\/46\.0)|(Opera\/46\.0.+Opera Mobi)|(Opera Mobi.+Opera(?:\/|\s+)46\.0)|(SamsungBrowser\/(8|9)\.2)|(Edge\/(17|18)(?:\.0)?)|(HeadlessChrome(?:\/(72|73)\.0\.\d+)?)|((Chromium|Chrome)\/(72|73)\.0(?:\.\d+)?)|(IEMobile[ \/]11\.0)|(Version\/12\.(0|1)(?:\.\d+)?.*Safari\/)|(Trident\/7\.0)|(Firefox\/(65|66)\.0\.\d+)|(Firefox\/(65|66)\.0(pre|[ab]\d+[a-z]*)?)|(([MS]?IE) 11\.0)/
export const browsersRegexps = [
  {
    family: 'edge',
    sourceRegExp: {},
    sourceRegExpString: '(Edge)\\/(\\d+)(?:\\.(\\d+))?',
    regExp: {},
    resultFixedVersion: null,
    requestVersions: [
      [17, 0, 0],
      [18, 0, 0],
    ],
    requestVersionsStrings: ['17.0.0', '18.0.0'],
    resultMinVersion: null,
    resultMaxVersion: null,
    regExpString: 'Edge\\/(17|18)(?:\\.0)?',
  },
  /* ... */
]
```


## Install

```bash
npm i -D vite-plugin-browserslist-useragent
# or
yarn add -D vite-plugin-browserslist-useragent
# or
pnpm add -D vite-plugin-browserslist-useragent
```

## Why?

https://github.com/browserslist/browserslist-useragent-regexp#why

### Why wrap `browserslist-useragent-regexp` with vite plugin?

Let [Vite](https://github.com/vitejs/vite) transform and bundle for you and no need to run CLI every time you change browserslist.

`browserslist-useragent-regexp` and its dependency [`useragent`](https://github.com/3rd-Eden/useragent) are no longer actively maintained. This plugin will patch and override deprecated dependencies.

Recommend to override `useragent` with my [fork](https://github.com/kingyue737/useragent) to suppress annoying [warning of deprecated dependencies](https://github.com/3rd-Eden/useragent/issues/168) in original package. For example, pnpm users can add the following code in `package.json`:
```json
// package.json
{
  "pnpm": {
    "overrides": {
      "useragent": "npm:@kingyue/useragent@^2.4.0"
    }
  }
}
```

## Virtual Module

Virtual module `virtual:supported-browsers` exposes two variables returned by the following two methods of `browserslist-useragent-regexp` whose arguments are passed from plugin's [options](#options):

### [getUserAgentRegExp(options)=> browsersRegexp: RegExp](https://browserslist.github.io/browserslist-useragent-regexp/modules/index.html#getuseragentregexp)

Compile browserslist query to one RegExp.

### [getUserAgentRegExps(options)=> browsersRegexps: IBrowserVersionedRegExp[]](https://browserslist.github.io/browserslist-useragent-regexp/modules/index.html#getuseragentregexps)

Compile browserslist query to [RegExps for each browser](#regexp-info-object).

#### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| browsers | `string \| string[]` | — | Manually provide a browserslist query (or an array of queries). Specifying this overrides the browserslist configuration specified in your project. |
| env | `string` | — | When multiple browserslist [environments](https://github.com/ai/browserslist#environments) are specified, pick the config belonging to this environment. |
| ignorePatch | `boolean` | `true` | Ignore differences in patch browser numbers. |
| ignoreMinor | `boolean` | `false` | Ignore differences in minor browser versions. |
| allowHigherVersions | `boolean` | `false` | For all the browsers in the browserslist query, return a match if the useragent version is equal to or higher than the one specified in browserslist. |
| allowZeroSubversions | `boolean` | `false` | Ignore match of patch or patch and minor, if they are 0. |

#### RegExp info object

| Property | Type | Description |
|----------|------|-------------|
| family | `string` | Browser family. |
| requestVersions | `[number, number, number][]` | Versions provided by browserslist. |
| regExp | `RegExp` | RegExp to match useragent with family and versions. |
| sourceRegExp | `RegExp` | Original useragent RegExp, without versions. |
| resultFixedVersion | `[number, number, number] \| null` | Useragent version of RegExp. |
| resultMinVersion | `[number, number, number] \| null` | Useragent min version of RegExp. |
| resultMaxVersion | `[number, number, number] \| null` | Useragent max version of RegExp. |

### Client Types

If you want type definition of `virtual:supported-browsers`, add `vite-plugin-browserslist-useragent/client` to `compilerOptions.types` of your `tsconfig`:

```json
{
  "compilerOptions":{
    "types":["vite-plugin-browserslist-useragent/client"]
  }
}
```

## License

[MIT](./LICENSE) License © 2022 Yue JIN
