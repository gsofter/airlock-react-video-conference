import React from 'react'
// import ParticipantInfo from '../ParticipantInfo/ParticipantInfo'
import ParticipantTracks from './ParticipantTracks'
import ParticipantInfo from './ParticipantInfo'
import { useSelector } from 'react-redux'
import usePublications from '../../../hooks/usePublications'
import Publication from './Publication'
import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  identity: {
    background: 'rgba(0, 0, 0, 0.7)',
    padding: '0.1em 0.3em',
    margin: 0,
    display: 'flex',
    alignItems: 'center',
  },
}))
export default function Participant({ participant, disableAudio }) {
  const room = useSelector((state) => state.room.room)
  const publications = usePublications(participant)
  const isLocal = participant === room.localParticipant
  const classes = useStyles()
  return (
    <ParticipantInfo participant={participant} disableAudio={disableAudio}>
      <ParticipantTracks
        participant={participant}
        disableAudio={disableAudio}
      />
    </ParticipantInfo>
  )
}
