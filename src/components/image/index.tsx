import React, { useEffect, useRef, useState } from 'react'
import { useInViewport } from 'ahooks'
import defaultImg from '@assets/images/default_goods.png'

const Index = (props: IndexProps) => {
  const [url, setUrl] = useState<string>(props.url)
  const {className, onClick =()=>{} } = props

  const imgRef = useRef<HTMLImageElement>(null)
  const inViewPort = useInViewport(imgRef)

  useEffect(() => {
    setUrl(props.url)
  },[props.url])

  return  <img ref={imgRef} onClick={()=> onClick()} onError={()=> setUrl(defaultImg) } className={className} src={ inViewPort ? url : defaultImg } />
}

export default Index

type IndexProps = {
  url: string
  onClick?: Function
  className: string
}
