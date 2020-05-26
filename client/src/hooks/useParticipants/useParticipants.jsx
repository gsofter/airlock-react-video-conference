import { useSelector } from 'react-redux'
export default function useParticipants() {
  const [participants, setParticipants] = useState(
    Array.from(room.participants.values()),
  )
  return participants
}
