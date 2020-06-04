import React from 'react'
import ParticipantTracks from './ParticipantTracks'
import MainParticipantInfo from './MainParticipantInfo'
import { useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles({
  container: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 'calc(100% - 70px)',
    background: 'black',
    border: '2px solid cyan',
    borderStyle: 'dashed',
  },
})
export default function MainParticipant() {
  // const mainParticipant = useMainSpeaker()
  // const [selectedParticipant] = useSelectedParticipant()
  // const videoPriority = mainParticipant === selectedParticipant ? 'high' : null
  const classes = useStyles()
  const roomData = useSelector((state) => state.room)
  const participants = roomData.participants
  const mainParticipant = participants.find(
    (p) => p.identity === roomData.mainSelection,
  )
  return mainParticipant ? (
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        // disableAudio
        // videoPriority={videoPriority}
      />
    </MainParticipantInfo>
  ) : (
    <div className={classes.container}>No one selected</div>
  )
}
