import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from 'resources/locales/en.json';
import sv from 'resources/locales/sv.json';

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: en,
  },
  sv: {
    translation: sv,
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: 'sv',

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
