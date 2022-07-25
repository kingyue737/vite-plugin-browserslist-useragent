import {
  getUserAgentRegExp,
  getUserAgentRegExps,
} from 'browserslist-useragent-regexp'
import type { Plugin } from 'vite'

export default function (
  options?: Parameters<typeof getUserAgentRegExp>[0]
): Plugin {
  const virtualModuleId = 'virtual:supported-browsers'
  const resolvedVirtualModuleId = '\0' + virtualModuleId

  return {
    name: 'vite-plugin-browserslist-useragent',
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId
      }
    },
    load(id) {
      if (id === resolvedVirtualModuleId) {
        return `export const browsersRegexp = ${getUserAgentRegExp(options)}
                export const browsersRegexps = ${getUserAgentRegExps(options)}`
      }
    },
  }
}
