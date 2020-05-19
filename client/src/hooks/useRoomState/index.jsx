import { useEffect, useState } from 'react'
import useVideoPartyContext from '../useVideoPartyContext'

export default function useRoomState() {
  const { room } = useVideoPartyContext()
  const [state, setState] = useState('disconnected')

  useEffect(() => {
    const setRoomState = () => {
      setState(room.state || 'disconnected')
      if (room.state === 'connected') console.log(room)
    }
    setRoomState()
    room
      .on('disconnected', setRoomState)
      .on('reconnected', setRoomState)
      .on('reconnecting', setRoomState)
    return () => {
      room
        .off('disconnected', setRoomState)
        .off('reconnected', setRoomState)
        .off('reconnecting', setRoomState)
    }
  }, [room])

  return state
}
