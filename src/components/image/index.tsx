import React, { useEffect, useRef, useState } from 'react'
import { useInViewport } from 'ahooks'
import defaultImg from '@assets/images/default_goods.png'

const Index = (props: IndexProps) => {
  const [url, setUrl] = useState<string>(props.url)
  const {className, lazy = false, onClick =()=>{} } = props

  let imgRef = undefined
  let inViewPort: boolean | undefined = true
  if(lazy) {
     imgRef = useRef<HTMLImageElement>(null)
     inViewPort = useInViewport(imgRef)
  }

  useEffect(() => {
    setUrl(props.url)
  },[props.url])

  return  <img ref={imgRef} onClick={()=> onClick()} onError={()=> setUrl(defaultImg) } className={className} src={ inViewPort ? url : defaultImg } />
}

export default Index

type IndexProps = {
  url: string
  lazy?: boolean
  onClick?: Function
  className: string
}
