import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    strictPort: true,
  },
  build: {
    sourcemap: false, // Production security: Never expose source maps
    chunkSizeWarningLimit: 1200,
    assetsInlineLimit: 4096,
  },
})
