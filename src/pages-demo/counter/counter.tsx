import React, { useState } from 'react';
import { useSelector, useDispatch, batch } from 'react-redux';
import { increment, decrement, incrementByAmount, incrementAsync } from './counterSlice';
import { RootState, AppDispatch } from '../../store';
import styles from './Counter.module.less';

const Counter = () => {
  const { value } = useSelector((state: RootState) => state.counter);
  const dispatch: AppDispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState<number>(2);

  return (
    <div>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="批量"
          onClick={() => {
            batch(() => {
              dispatch(increment());
              dispatch(increment());
              dispatch(increment());
              dispatch(increment());
              dispatch(increment());
            });
          }}
        >
          +
        </button>
        <span className={styles.value}>{value}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => {
            dispatch(decrement());
          }}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={(e) => setIncrementAmount(Number(e.target.value))}
        />
        <button className={styles.button} onClick={() => dispatch(incrementByAmount(Number(incrementAmount) || 0))}>
          Add Amount
        </button>
        <button className={styles.asyncButton} onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}>
          Add Async
        </button>
      </div>
    </div>
  );
};

export default Counter;
