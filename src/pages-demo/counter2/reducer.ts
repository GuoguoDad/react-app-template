import { IActionType } from './actions';
import { ModifyAction, CounterState } from './types';

const initialState: CounterState = {
  count: 0,
};

export default function counterReducer(state = initialState, action: ModifyAction) {
  const { type, payload = 1 } = action;
  switch (type) {
    case IActionType.INCREMENT:
      return { count: state.count + payload };
    case IActionType.DECREMENT:
      return { count: state.count - payload };
    default:
      return state;
  }
}
