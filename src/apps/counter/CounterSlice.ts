import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from '../../store';

interface CounterState {
  value: number;
}

const initialState: CounterState = {
  value: 0
}

export const CounterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: state => {
      state.value += 1;
    },
    decrement: state => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload
    }
  }
})

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;

export const incrementAsync = (amount: number): AppThunk => dispatch => {
  setTimeout(()=>{
    dispatch(incrementByAmount(amount))
  }, 1000)
}

export const selectCount = (state: RootState) => state.counter.value;

export default CounterSlice.reducer;