import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Enable minification
    minify: 'terser',
    // Configure chunk size optimization
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-vendor': ['@fortawesome/fontawesome-free', 'react-icons']
        }
      }
    }
  },
  // Enable source map in development only
  sourcemap: process.env.NODE_ENV === 'development',
  // Configure server
  server: {
    // Enable compression
    compress: true
  }
})
