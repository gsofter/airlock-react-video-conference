import React from 'react'
import Pusher from 'react-pusher'

const PusherProvider = () => {
  const onStreamUrlChange = (data) => {
    console.log(data)
  }

  return (
    <>
      <Pusher
        channel="airlock-channel"
        event="stream-url-change"
        onUpdate={onStreamUrlChange}
      />
    </>
  )
}

export default PusherProvider
