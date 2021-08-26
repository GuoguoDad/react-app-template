import React, {useEffect, useState} from 'react'
import defaultImg from '@assets/images/default_goods.png'

const Index = (props: IndexProps) => {
  const [url, setUrl] = useState<string>(props.url)
  const {className, onClick =()=>{} } = props

  useEffect(() => {
    setUrl(props.url)
  },[props.url])

  return  <img onClick={()=> onClick()} onError={()=> setUrl(defaultImg) } className={className} src={url || defaultImg } />
}

export default Index

type IndexProps = {
  url: string
  onClick?: Function
  className: string
}
