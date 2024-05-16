import antfu from '@antfu/eslint-config'

export default antfu({
  formatters: {
    prettierOptions: {
      printWidth: 120
    }
  },
  unocss: true,
  vue: true,
})
