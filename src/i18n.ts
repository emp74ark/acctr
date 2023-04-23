import i18n from "i18next";
import {initReactI18next} from "react-i18next";
import en from "./assets/i18n/en.json";
import ru from "./assets/i18n/ru.json";

const resources = {
  en: {
    translation: en,
  },
  ru: {
    translation: ru,
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: "ru",
  react: {
    transEmptyNodeValue: "",
    transSupportBasicHtmlNodes: true,
    transKeepBasicHtmlNodesFor: ["br", "strong", "i", "p"]
  }
});

export default i18n;
