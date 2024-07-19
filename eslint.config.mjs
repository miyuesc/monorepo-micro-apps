import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    prettierOptions: {
      printWidth: 120,
      quotes: 'single',
    }
  },
  vue: true,
  node: true,
  typescript: true,
  rules: {
    'node/prefer-global/process': 'off',
    'no-case-declarations': 'off',
    'ts/ban-ts-comment': 'off',
  }
})
