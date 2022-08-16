import React, { useEffect } from 'react'
import { useIonRouter } from '@ionic/react'
import { Button } from 'antd-mobile'
import { Scene } from '@comps'
import F2 from '@antv/f2'

import styles from './index.module.less'

const Index = () => {
  const history = useIonRouter()

  useEffect(() => {
    initChart()
  }, [])

  return (
    <Scene title="图片详情" onLeftClick={() => history.goBack()}>
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <canvas id="c1" />
        </div>
        <div className={styles.container}>
          <Button
            color="primary"
            size="large"
            onClick={() => {
              history.push('/main', 'back', 'pop')
            }}
          >
            pop
          </Button>
        </div>
      </div>
    </Scene>
  )

  function initChart() {
    const data = [
      { year: '1951 年', sales: 38 },
      { year: '1952 年', sales: 52 },
      { year: '1956 年', sales: 61 },
      { year: '1957 年', sales: 145 },
      { year: '1958 年', sales: 48 },
      { year: '1959 年', sales: 38 },
      { year: '1960 年', sales: 38 },
      { year: '1962 年', sales: 38 }
    ]
    const chart = new F2.Chart({
      id: 'c1',
      width: 375,
      height: 265,
      pixelRatio: window.devicePixelRatio
    })

    chart.source(data)
    chart.interval().position('year*sales')
    chart.render()
  }
}

export default Index
