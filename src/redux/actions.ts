export enum ActionType {}

export interface Action {
  type: ActionType;
  payload?: any;
}
