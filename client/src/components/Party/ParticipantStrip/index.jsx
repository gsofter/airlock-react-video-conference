import React from 'react'
// import Participant from '../Participant/Participant'
import { styled } from '@material-ui/core/styles'
import { useLocalVideoTrack } from '../../../hooks/useLocalTracks'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'
import Participant from '../Participant'
import useParticipants from '../../../hooks/useParticipants'

// import useSelectedParticipant from '../VideoProvider/useSelectedParticipant/useSelectedParticipant'

const Container = styled('aside')(({ theme }) => ({
  padding: '0.5em',
  overflowY: 'auto',
  [theme.breakpoints.down('xs')]: {
    overflowY: 'initial',
    overflowX: 'auto',
    padding: 0,
    display: 'flex',
  },
}))

const ScrollContainer = styled('div')(({ theme }) => ({
  [theme.breakpoints.down('xs')]: {
    display: 'flex',
  },
}))

export default function ParticipantStrip() {
  const {
    room: { localParticipant },
  } = useVideoPartyContext()
  const participants = useParticipants()
  //   const [selectedParticipant, setSelectedParticipant] = useSelectedParticipant()

  return (
    <Container>
      <ScrollContainer>
        <Participant
          participant={localParticipant}
          //   isSelected={selectedParticipant === localParticipant}
          //   onClick={() => setSelectedParticipant(localParticipant)}
        />
        {participants.map((participant) => (
          <Participant
            key={participant.sid}
            participant={participant}
            // isSelected={selectedParticipant === participant}
            // onClick={() => setSelectedParticipant(participant)}
          />
        ))}
      </ScrollContainer>
    </Container>
  )
}
