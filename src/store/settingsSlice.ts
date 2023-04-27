import {LanguageType, ThemeType} from "../entities";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import i18n from "../i18n";

interface SettingsState {
  language: LanguageType;
  theme: ThemeType;
}

const initialState: SettingsState = {
  language: "en",
  theme: "light",
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    toggleLanguage: (state, action: PayloadAction<LanguageType>) => {
      state.language = action.payload;
      i18n.changeLanguage(action.payload);
    },
    toggleTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    }
  }
});

export const {
  toggleLanguage,
  toggleTheme,
} = settingsSlice.actions;

export default settingsSlice.reducer;
