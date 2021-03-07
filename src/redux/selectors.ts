import { AppState } from './state';
import { Theme } from './themes';

export function theme(state: AppState): Theme {
  return state.theme;
}
