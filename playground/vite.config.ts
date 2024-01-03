import { defineConfig } from 'vite'
import SupportedBrowsers from 'vite-plugin-browserslist-useragent'

export default defineConfig({
  plugins: [SupportedBrowsers(/* options */)],
})
