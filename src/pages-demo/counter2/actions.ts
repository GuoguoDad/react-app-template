import { Action } from 'redux'
import { ThunkDispatch } from 'redux-thunk'
import { CounterState, ModifyAction } from './types'

export enum IActionType {
  INCREMENT = 'INCREMENT',
  DECREMENT = 'DECREMENT',
}

export const increment = (): ModifyAction => ({
  type: IActionType.INCREMENT,
})

export const decrement = (): ModifyAction => ({
  type: IActionType.DECREMENT,
})

export const incrementByAmount = (amount: number): ModifyAction => ({
  type: IActionType.INCREMENT,
  payload: amount,
})

export const incrementAsync = (amount: number) => async (
  dispatch: ThunkDispatch<CounterState, unknown, Action<string>>,
) => {
  const a: number = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(amount)
    }, 1000)
  })
  dispatch(incrementByAmount(a))
}
