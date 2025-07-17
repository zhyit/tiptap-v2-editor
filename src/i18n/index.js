import {createI18n} from "vue-i18n";
import en from './locales/en.json'
import zh from './locales/zh.json'

export const i18n = createI18n({
    // something vue-i18n options here ...
    legacy: false, // 使用 Composition API 模式 // you must set `false`, to use Composition API
    locale: 'zh', // 默认语言
    fallbackLocale: 'en',
    messages: {
        en,
        zh,
    },
})
