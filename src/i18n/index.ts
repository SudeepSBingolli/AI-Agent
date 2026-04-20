import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { en, es, fr } from './local';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: en,
      es: es,
      fr: fr,
    },
    lng: localStorage.getItem('language') || 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
