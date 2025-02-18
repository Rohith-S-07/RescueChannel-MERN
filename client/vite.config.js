import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: process.env.PORT || 5173,  // Use the provided PORT or default to 5173
    host: '0.0.0.0',  // Make the server accessible externally
    allowedHosts: [
      'rescuechannel.onrender.com',  // Allow the specific host
      'localhost',  // Also allow localhost for local dev
    ],
  },
  define: {
    'process.env': {},  // Ensures environment variables are correctly defined
  },
})