import React, { useState } from 'react'
import styles from './index.module.less'

export default function App() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('Star')

  const countPlusThree = () => {
    setCount(count => count + 1)
    setCount(count => count + 2)
    setCount(count => count + 3)
  }
  return (
    <div className={styles.container}>
      <p>{name} Has Clicked <strong>{count}</strong> Times</p>
      <button onClick={countPlusThree}>Click *3</button>
    </div>
  )
}
