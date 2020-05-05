import React from 'react'
// import ParticipantStrip from '../ParticipantStrip/ParticipantStrip'
import { styled } from '@material-ui/core/styles'
import ParticipantStrip from '../ParticipantStrip'
// import MainParticipant from '../MainParticipant/MainParticipant'
import { makeStyles } from '@material-ui/core'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'
import Participant from '../Participant'
import useParticipants from '../../../hooks/useParticipants'
const useStyles = makeStyles((theme) => ({
  djScreen: {
    gridArea: 'dj',
    backgroundColor: theme.palette.success.main,
  },
  me: {
    gridArea: 'ra1',
  },
  ra2: {
    gridArea: 'ra2',
  },
  ra3: {
    gridArea: 'ra3',
  },
  ra4: {
    gridArea: 'ra4',
  },
  rb1: {
    gridArea: 'rb1',
  },
  rb2: {
    gridArea: 'rb2',
  },
  rb3: {
    gridArea: 'rb3',
  },
  rb4: {
    gridArea: 'rb4',
  },
  emptyScreen: {
    backgroundColor: '#6c757d',
    height: '100%',
    border: '1px solid grey',
  },
}))

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `1fr 1fr 1fr 1fr`,
  gridTemplateRows: `1fr 1fr 1fr 1fr`,
  gridTemplateAreas: `"dj dj rb1 rb2"
                      "dj dj rb3 rb4"
                      "ra1 ra2 aa aa"
                      "ra3 ra4 aa aa"`,
  // [theme.breakpoints.down('xs')]: {
  //   gridTemplateAreas: '"participantList" "."',
  //   gridTemplateColumns: `auto`,
  //   gridTemplateRows: `calc(100% - ${theme.sidebarMobileHeight + 12}px) ${
  //     theme.sidebarMobileHeight + 6
  //   }px`,
  //   gridGap: '6px',
  // },
}))

const EmptyParticipant = () => {
  const classes = useStyles()
  return <div className={classes.emptyScreen}> Not connected </div>
}

export default function Room() {
  const classes = useStyles()
  const {
    room: { localParticipant },
  } = useVideoPartyContext()
  const participants = useParticipants()
  return (
    <Container>
      <div className={classes.djScreen}>
        <h1>DJSCREEN</h1>
      </div>
      <div className={classes.me}>
        <Participant participant={localParticipant} />
      </div>

      <div className={classes.ra2}>
        {participants.length > 0 ? (
          <Participant participant={participants[0]} />
        ) : (
          <EmptyParticipant />
        )}
      </div>
      <div className={classes.ra3}>
        {participants.length > 1 ? (
          <Participant participant={participants[1]} />
        ) : (
          <EmptyParticipant />
        )}
      </div>
      <div className={classes.ra4}>
        {participants.length > 2 ? (
          <Participant participant={participants[2]} />
        ) : (
          <EmptyParticipant />
        )}
      </div>

      <div className={classes.rb1}>
        {participants.length > 3 ? (
          <Participant participant={participants[3]} />
        ) : (
          <EmptyParticipant />
        )}
      </div>
      <div className={classes.rb2}>
        {participants.length > 4 ? (
          <Participant participant={participants[4]} />
        ) : (
          <EmptyParticipant />
        )}
      </div>
      <div className={classes.rb3}>
        {participants.length > 5 ? (
          <Participant participant={participants[5]} />
        ) : (
          <EmptyParticipant />
        )}
      </div>
      <div className={classes.rb3}>
        {participants.length > 6 ? (
          <Participant participant={participants[6]} />
        ) : (
          <EmptyParticipant />
        )}
      </div>
      {/* <div className={classes.me}>
        <Participant participant={localParticipant} />
      </div>
      <div className={classes.ra2}>
        <Participant participant={localParticipant} />
      </div> */}
      {/* <MainParticipant /> */}
    </Container>
  )
}
