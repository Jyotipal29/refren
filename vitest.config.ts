import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    globals: true, // Enable global variables like describe, it, expect, etc.
    environment: "jsdom", // Use jsdom environment for DOM support
    setupFiles: "./src/setupTests.ts", // Optional: setup file for additional configurations
  },
});
