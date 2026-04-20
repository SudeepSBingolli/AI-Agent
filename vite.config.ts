import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __BASE_PATH__: JSON.stringify(process.env.VITE_BASE_PATH || '/'),
  },
  server: {
    port: 5173,
    open: true,
  },
})
