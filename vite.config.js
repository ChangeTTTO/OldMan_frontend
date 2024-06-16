import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { UndrawUiResolver } from 'undraw-ui/es/resolvers'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
      Components({
          resolvers: [UndrawUiResolver]
      }),
      vue()
  ],
})
