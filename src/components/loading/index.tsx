import React from 'react';
import './index.less';

export const Loading = (props: LoadingProps) => {
  const { isLoading, hasMore } = props
  
  return (
    <div className="loading">
      {isLoading ? '加载中...' : hasMore ? '加载结束' : '没有更多了~'}
    </div>
  )
}

export type LoadingProps = {
  isLoading: boolean, 
  hasMore: boolean
}