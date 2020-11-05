import { IActionType } from './actions';

export type ModifyAction = {
  type: IActionType.DECREMENT | IActionType.INCREMENT;
  payload?: number;
};

export interface CounterState {
  count: number;
}
