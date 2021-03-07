import { AppState, initAppState } from './state';
import { Action, ActionType } from './actions';

export function reducer(
  state: AppState = initAppState,
  action: Action
): AppState {
  switch (action.type) {
    default:
      return state;
  }
}
