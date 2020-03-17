import Vue from 'vue'
import VueI18n from 'vue-i18n'
import lang from '@/language/lang'

Vue.use(VueI18n)

const messages = lang

const i18n = new VueI18n({
  locale: 'pt-BR',
  messages
})

export default i18n
