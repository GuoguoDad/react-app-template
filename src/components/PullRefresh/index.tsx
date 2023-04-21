import React, { PropsWithChildren, useEffect, useRef, useState } from 'react'
import './index.css'

export type PullRefreshProps = PropsWithChildren<{
  onRefresh?: (freshEnd: Function) => void
}>

const PullToRefresh = (props: PullRefreshProps) => {
  const { onRefresh = () => {} } = props

  const [status, setStatus] = useState<string>('')

  const containerRef = useRef<HTMLDivElement>(null)

  const onMove = useRef<boolean>(false)
  const refreshing = useRef<boolean>(false)
  const startY = useRef<number>(0)
  const deltaY = useRef<number>(0)
  const slowY = useRef<number>(0)

  const touchStartFun = (e: TouchEvent) => {
    setStatus('')
    if (!onMove.current) {
      startY.current = e.touches[0].pageY
      containerRef.current!.style.transition = 'transform 0s'
      onMove.current = true
    }
  }

  const touchMoveFun = (e: TouchEvent) => {
    if (!refreshing.current) {
      deltaY.current = e.touches[0].pageY - startY.current
      if (deltaY.current > 0) {
        setStatus('下拉刷新')
        if (deltaY.current > 60) {
          setStatus('释放刷新')
          slowY.current = (deltaY.current - 60) * 0.2 + 60
        } else {
          slowY.current = deltaY.current
        }
        containerRef.current!.style.transform = `translateY(${slowY.current}px)`
      }
    }
  }

  const touchEndFun = (e: TouchEvent) => {
    containerRef.current!.style.transition = 'transform 0.5s ease 0s'
    if (deltaY.current > 60) {
      refreshing.current = true
      containerRef.current!.style.transform = 'translateY(60px)'
      setStatus('加载中...')
      onRefresh(freshEndFun)
    } else {
      containerRef.current!.style.transform = 'translateY(0px)'
    }
    startY.current = 0
    deltaY.current = 0
    slowY.current = 0
    onMove.current = false
  }

  const freshEndFun = () => {
    refreshing.current = false
    containerRef.current!.style.transform = 'translateY(0px)'
    setStatus('刷新成功')
  }

  useEffect(() => {
    containerRef.current?.addEventListener('touchstart', touchStartFun, false)
    containerRef.current?.addEventListener('touchmove', touchMoveFun, false)
    containerRef.current?.addEventListener('touchend', touchEndFun, false)

    return () => {
      containerRef.current?.removeEventListener('touchstart', touchStartFun, false)
      containerRef.current?.removeEventListener('touchmove', touchMoveFun, false)
      containerRef.current?.removeEventListener('touchend', touchEndFun, false)
    }
  }, [])

  return (
    <div ref={containerRef} id="pull-refresh-container">
      <div className="pull-refresh-head">
        <p className="pull-refresh-text">{status}</p>
      </div>
      {props.children}
    </div>
  )
}

export default PullToRefresh
