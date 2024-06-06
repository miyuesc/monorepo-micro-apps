import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./*/*.test.ts'],
    reporters: ['html'],
    outputFile: './report/index.html',
  },
  base: './',
})
