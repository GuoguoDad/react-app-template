import React from 'react'
import { Button, Space } from 'antd-mobile'
import { useHistory } from 'react-router'
import { Header } from '@comps'


const ImageList = () => {
  const history = useHistory()

  return (
    <>
      <Header
        hasBack
        backFun={()=> history.goBack()}
        showRight
        title="图片详情"
      />
      <Space wrap>
        <Button
          onClick={() => {
            alert('hello.')
          }}
        >
          Default
        </Button>
        <Button color='primary'>Primary</Button>
        <Button color='success'>Success</Button>
        <Button color='danger'>Danger</Button>
        <Button color='warning'>Warning</Button>
      </Space>
    </>
  )
}

export default ImageList
