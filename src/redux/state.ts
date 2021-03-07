import { lightTheme, Theme } from './themes';

export interface AppState {
  theme: Theme;
}

export const initAppState: AppState = {
  theme: lightTheme,
};
