import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      '/auth': {
        target:
          'https://nannies-app-default-rtdb.europe-west1.firebasedatabase.app',
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/auth/, '/auth'),
      },
    },
  },
});
