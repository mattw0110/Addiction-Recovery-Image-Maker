import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Base set to './' ensures assets load correctly on GitHub Pages 
  // regardless of the repository name (e.g. /repo-name/)
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false
  },
  define: {
    // Prevent runtime crashes when accessing process.env in browser
    'process.env': {} 
  }
})
