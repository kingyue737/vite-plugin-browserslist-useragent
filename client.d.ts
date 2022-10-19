declare module 'virtual:supported-browsers' {
  import type { BrowserVersionedRegex } from 'browserslist-useragent-regexp'
  export const browsersRegex: RegExp
  export const browsersRegexes: BrowserVersionedRegex[]
}
