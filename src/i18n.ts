import LanguageDetector from "i18next-browser-languagedetector";
import en from "resources/locales/en.json";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import portalEn from "config/portal_en.json";
import portalSv from "config/portal_sv.json";
import sv from "resources/locales/sv.json";

// the translations
const resources = {
  en: {
    translation: {
      ...en,
      ...portalEn,
    },
  },
  sv: {
    translation: {
      ...sv,
      ...portalSv,
    },
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: "sv",
    detection: {
      order: [
        "querystring",
        "cookie",
        "localStorage",
        "htmlTag",
        "navigator",
        "path",
        "subdomain",
      ],
    },

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
