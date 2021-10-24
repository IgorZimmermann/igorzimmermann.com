import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en/translations.json'
import hu from './locales/hu/translations.json'
import it from './locales/it/translations.json'

i18n.use(initReactI18next).init({
	fallbackLng: 'en',
	lng: 'en',
	resources: {
		en: {
			translations: en,
		},
		hu: {
			translations: hu,
		},
		it: {
			translations: it,
		},
	},
	ns: ['translations'],
	defaultNS: 'translations',
})

i18n.languages = ['en', 'hu', 'it']

export default i18n
