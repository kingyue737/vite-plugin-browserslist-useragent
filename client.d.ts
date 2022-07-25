declare module 'virtual:supported-browsers' {
  import type { IBrowserVersionedRegExp } from 'browserslist-useragent-regexp'
  export const browsersRegexp: RegExp
  export const browsersRegexps: IBrowserVersionedRegExp[]
}
