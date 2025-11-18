import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // This is critical for GitHub Pages (repo-name subfolder deployment)
  base: './',
  build: {
    outDir: 'docs',
    emptyOutDir: true,
    sourcemap: false
  },
  define: {
    // Prevents "process is not defined" error in browser
    'process.env': {}
  }
})