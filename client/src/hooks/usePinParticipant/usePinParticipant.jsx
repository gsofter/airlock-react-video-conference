import { useSelector } from 'react-redux'
import useParticipants from '../useParticipants/useParticipants'

const usePinParticipant = (pinId) => {
  const roomData = useSelector((state) => state.room)
  const pins = roomData.pins
  console.log('pins => ', roomData)
  const participants = useParticipants()
  if (pins.length <= pinId) return null
  else {
    const pinIdentity = pins[pinId]
    const pinParticipant = participants.find(
      (participant) => participant.identity === pinIdentity,
    )
    return pinParticipant
  }
}

export default usePinParticipant
