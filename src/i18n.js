import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'resources/locales/en.json';
import portalEn from 'resources/locales/portal_en.json';
import sv from 'resources/locales/sv.json';
import portalSv from 'resources/locales/portal_sv.json';
import LanguageDetector from 'i18next-browser-languagedetector';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      ...en,
      ...portalEn
    }
  },
  sv: {
    translation: {
      ...sv,
      ...portalSv
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: 'sv',

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
