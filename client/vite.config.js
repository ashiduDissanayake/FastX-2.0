import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:8080/', // Your backend server URL
        changeOrigin: false, // For virtual hosted sites
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Modify the request path if necessary
      },
    },
  },
});
