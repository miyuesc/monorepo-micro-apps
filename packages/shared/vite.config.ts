import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['./test/*/*.test.ts'],
    reporters: ['html'],
    outputFile: './test/report/index.html',
  },
})
