import {
  getUserAgentRegex,
  getUserAgentRegexes,
} from 'browserslist-useragent-regexp'
import type { Plugin } from 'vite'

export default function (
  options?: Parameters<typeof getUserAgentRegex>[0],
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
        return `export const browsersRegex = ${getUserAgentRegex(options)}
                export const browsersRegexes = ${JSON.stringify(
                  getUserAgentRegexes(options),
                )}`
      }
    },
  }
}
