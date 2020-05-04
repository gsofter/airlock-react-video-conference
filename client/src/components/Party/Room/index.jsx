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
        <Participant participant={localParticipant} />
      </div>
      <div className={classes.ra3}>
        <Participant participant={localParticipant} />
      </div>
      <div className={classes.ra4}>
        <Participant participant={localParticipant} />
      </div>

      <div className={classes.rb1}>
        <Participant participant={localParticipant} />
      </div>
      <div className={classes.rb2}>
        <Participant participant={localParticipant} />
      </div>
      <div className={classes.rb3}>
        <Participant participant={localParticipant} />
      </div>
      <div className={classes.rb4}>
        <Participant participant={localParticipant} />
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
