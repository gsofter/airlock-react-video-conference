import { useSelector } from 'react-redux'
export default function useParticipantWithId(participantId) {
  const participants = useParticipants()
  const roomData = useSelector((state) => state.room)
  const dj = roomData.dj
  const participant = participants.find(
    (participant) => participant.identity === participantId,
  )

  if (participant) return participant
  else return null
}
