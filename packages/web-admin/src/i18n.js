import { initReactI18next } from 'react-i18next';
import i18n from "i18next";
import LngDetector from 'i18next-browser-languagedetector';

import enJSON from './locales/en.json';
import ruJSON from './locales/ru.json';
import uzJSON from './locales/uz.json';

i18n.use(LngDetector).use(initReactI18next).init({
        resources: {
            en: { translation: enJSON },
            ru: { translation: ruJSON },
            uz: { translation: uzJSON },
        },
        lng: "uz",
        fallbackLng: "uz",
        debug: true,
        interpolation: {
            escapeValue: false,
        },
    });

export const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
};

export default i18n;