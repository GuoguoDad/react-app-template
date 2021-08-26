import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import styles from './counter.module.less'
import { increment, decrement, incrementByAmount, incrementAsync } from './actions'
import { CounterState } from './types'

const mapStateToProps = (state: CounterState) => ({
  count: state.count,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onDecrement: () => dispatch(decrement()),
  onIncrement: () => dispatch(increment()),
  onIncrementByAmount: (amount: number) => dispatch(incrementByAmount(amount)),
  // @ts-ignore
  onIncrementAsync: (amount: number) => dispatch(incrementAsync(amount)),
})

type ReduxProps = ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>;

type DemoState = {
  step: number;
};

class Counter2Demo extends Component<ReduxProps, DemoState> {
  constructor(props: ReduxProps) {
    super(props)
    this.state = {
      step: 2,
    }
  }

  render() {
    const { step } = this.state
    const { count, onIncrement, onDecrement, onIncrementByAmount, onIncrementAsync } = this.props

    return (
      <div>
        <div className={styles.row}>
          <button
            className={styles.button}
            aria-label="Increment count"
            onClick={() => {
              onIncrement()
            }}
          >
            +
          </button>
          <span className={styles.value}>{count}</span>
          <button
            className={styles.button}
            aria-label="Decrement count"
            onClick={() => {
              onDecrement()
            }}
          >
            -
          </button>
        </div>
        <div className={styles.row}>
          <input
            className={styles.textbox}
            aria-label="Set increment amount"
            value={step}
            onChange={(e) => this.setState({ step: Number(e.target.value) })}
          />
          <button className={styles.button} onClick={() => onIncrementByAmount(Number(step) || 0)}>
            Add
          </button>
          <button className={styles.asyncButton} onClick={() => onIncrementAsync(Number(step) || 0)}>
            Add Async
          </button>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter2Demo)
