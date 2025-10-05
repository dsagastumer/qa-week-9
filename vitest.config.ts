import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    hookTimeout: 30000,
    testTimeout: 30000,
    reporters: ['default']
  }
});
