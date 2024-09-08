import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // Enable global variables like describe, it, expect, etc.
    environment: "jsdom", // Use jsdom environment for DOM support
    setupFiles: "./src/setupTests.ts", // Optional: setup file for additional configurations
  },
});
