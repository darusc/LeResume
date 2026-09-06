import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

import { fileURLToPath } from "url"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: 'localhost',
    port: 5173
  },
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@assets", replacement: fileURLToPath(new URL('./src/assets', import.meta.url)) },
      { find: "@context", replacement: fileURLToPath(new URL('./src/context', import.meta.url)) },
      { find: "@data", replacement: fileURLToPath(new URL('./src/data', import.meta.url)) },
      { find: "@hooks", replacement: fileURLToPath(new URL('./src/hooks', import.meta.url)) },
      { find: "@pages", replacement: fileURLToPath(new URL('./src/pages', import.meta.url)) },
      { find: "@services", replacement: fileURLToPath(new URL('./src/services', import.meta.url)) },
      { find: "@templates", replacement: fileURLToPath(new URL('./src/templates', import.meta.url)) },
      { find: "@components", replacement: fileURLToPath(new URL('./src/components', import.meta.url)) },
    ]
  }
})
