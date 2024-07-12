/**
 * @desc i18n
 * @author MiyueFE <https://github.com/miyuesc>
 * @since 2024/7/12 下午2:01
 */
import { createI18n } from 'vue-i18n'

export const defaultLang = 'zh_CN'

const i18n = createI18n({
  legacy: false,
  globalInjection: true,
  locale: defaultLang,
  messages: {
    zh_CN: {},
    en_US: {},
  },
})

export default i18n
