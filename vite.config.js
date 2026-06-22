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
        '**/public/assets/hero-frames-webp/**',
        '**/Timelapse_construction_video_bui…_202606210154_frames/**',
        '**/ezgif-5be850e013b314e8-jpg/**',
      ],
    },
  },
  optimizeDeps: {
    // Only scan the src folder for deps — not the whole project root
    entries: ['./src/**/*.{js,jsx,ts,tsx}'],
  },
})
