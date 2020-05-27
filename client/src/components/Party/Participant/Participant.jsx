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
  // <ParticipantInfo participant={participant}>
  const room = useSelector((state) => state.room.room)
  const publications = usePublications(participant)
  const isLocal = participant === room.localParticipant
  const classes = useStyles()
  let filteredPublications

  filteredPublications = publications.filter((p) => p.trackName !== 'screen')
  return (
    <div>
      <h4 className={classes.identity}> {participant.identity} </h4>
      {filteredPublications.map((publication) => (
        <Publication
          key={publication.kind}
          publication={publication}
          participant={participant}
          isLocal={isLocal}
          disableAudio={disableAudio}
        />
      ))}
    </div>
  )
}
