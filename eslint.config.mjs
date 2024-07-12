import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    prettierOptions: {
      printWidth: 120
    }
  },
  vue: true,
  node: true,
  typescript: true,
  rules: {
    'node/prefer-global/process': 'off',
  }
})
