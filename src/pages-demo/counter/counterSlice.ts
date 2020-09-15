import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CounterState } from './types';

const initialState: CounterState = {
  value: 0,
  loading: 'idle',
  currentRequestId: '',
  errMessage: ''
}

export const incrementAsync = createAsyncThunk<number, Partial<number>,{ state: RootState }>(
  'add/counter',
  async (amount, { getState, requestId, rejectWithValue }) => {

    const { loading, currentRequestId } = getState().counter;
    if(loading !== 'pending' || requestId !== currentRequestId) {
      return rejectWithValue(`重复请求中requestId:${requestId}`)
    }
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        resolve(amount)
      }, 1000)
    })
  }
)

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
  },
  extraReducers: builder => {
    builder.addCase(incrementAsync.pending,(state, { meta })=>{
      if (state.loading === 'idle') {
        state.loading = 'pending';
        state.currentRequestId = meta.requestId;
      }
    }),
    builder.addCase(incrementAsync.fulfilled, (state, { payload, meta })=> {
      if (state.loading === 'pending' && state.currentRequestId === meta.requestId) {
        state.value += payload;
        state.loading = 'idle'
        state.currentRequestId = ''
      }
    }),
    builder.addCase(incrementAsync.rejected, (state, { payload, meta, error }) => {
      if (state.loading === 'pending' && state.currentRequestId === meta.requestId) {
        state.loading = 'idle'
        const msg = payload as string;
        state.errMessage = msg ?? error?.message ?? ''
        state.currentRequestId = ''
      }
    })
  }
})

export const { increment, decrement, incrementByAmount } = CounterSlice.actions;

export default CounterSlice.reducer;