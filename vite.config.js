import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Exclude large/irrelevant folders from the file watcher
      ignored: [
        '**/node_modules/**',
        '**/dist/**',
      ],
    },
  },
  optimizeDeps: {
    // Only scan the src folder for deps — not the whole project root
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
})
