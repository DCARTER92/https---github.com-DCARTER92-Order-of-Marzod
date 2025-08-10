
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000
    },

    // Build options for readable output
    build: {
      minify: false, // disables minification
      rollupOptions: {
        output: {
          manualChunks: undefined // disables chunk splitting
        }
      }
    }
  })
