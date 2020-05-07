import React from 'react'
import { useSelector } from 'react-redux'
import Room from '../../components/Party/Room'
import useRoomState from '../../hooks/useRoomState'
import useVideoPartyContext from '../../hooks/useVideoPartyContext'
import Controls from '../../components/Party/Controls'
import { styled } from '@material-ui/core/styles'
import { makeStyles, Typography } from '@material-ui/core'
import PinParticipant from '../../components/Party/Participant/PinParticipant'
import Participant from '../../components/Party/Participant'
// import { LocalParticipant } from 'twilio-video'
import LocalParticipant from '../../components/Party/Participant/LocalParticipant'

const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `1fr 1fr 1fr 1fr 1fr 1fr`,
  gridTemplateRows: `1fr 1fr 1fr 1fr 1fr`,
  gridTemplateAreas: `"lg mp mp mp mp ct"
                      "mg mp mp mp mp ct"
                      "mg mp mp mp mp ct"
                      "me mp mp mp mp t7"
                      "t1 t2 t3 t4 t5 t6"`,
}))

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.contrastText,
    height: '100%',
    position: 'relative',
  },
  mainViewer: {
    gridArea: 'mp',
    padding: theme.spacing(1),
    backgroundColor: 'yellow',
  },
  logo: {
    gridArea: 'lg',
    textAlign: 'center',
    paddingTop: '10px',
  },
  chat: {
    backgroundColor: 'white',
    border: '1px solid red',
    gridArea: 'mg',
  },
  me: {
    gridArea: 'me',
  },
  tabControl: {
    gridArea: 'ct',
  },
  t1: {
    gridArea: 't1',
  },
  t2: {
    gridArea: 't2',
  },
  t3: {
    gridArea: 't3',
  },
  t4: {
    gridArea: 't4',
  },
  t5: {
    gridArea: 't5',
  },
  t6: {
    gridArea: 't6',
  },
  t7: {
    gridArea: 't7',
  },
  t8: {
    gridArea: 't8',
  },
}))

const PartyTabControl = () => {
  return (
    <div>
      <img src="./assets/live-dj-white.png" alt="asdf" />
      <img src="./assets/dance.png" alt="asdf" />
      <img src="./assets/grid.png" alt="asdf" />
    </div>
  )
}
const VideoParty = () => {
  const classes = useStyles()
  // const roomData = useSelector((state) => state.room)
  const roomState = useRoomState()

  return (
    <>
      <main className={classes.mainWrapper}>
        {roomState === 'connected' ? (
          <>
            <Container>
              <div className={classes.mainViewer}> asdfasdf </div>
              <div className={classes.logo}>
                <img src="./assets/white-logo.png" />
                <Typography variant="body2" color="white">
                  squareparty
                </Typography>
              </div>
              <div className={classes.chat}>
                <p> Hello, how are you doing </p>
                <p> I am good </p>
              </div>
              <div className={classes.tabControl}>
                <PartyTabControl />
              </div>
              <div className={classes.me}>
                <LocalParticipant />
              </div>
              <div className={classes.t1}>
                <PinParticipant pinId={0} />
              </div>
              <div className={classes.t2}>
                <PinParticipant pinId={1} />
              </div>
              <div className={classes.t3}>
                <PinParticipant pinId={2} />
              </div>
              <div className={classes.t4}>
                <PinParticipant pinId={3} />{' '}
              </div>
              <div className={classes.t5}>
                {' '}
                <PinParticipant pinId={4} />{' '}
              </div>
              <div className={classes.t6}>
                <PinParticipant pinId={5} />{' '}
              </div>
              <div className={classes.t7}>
                {' '}
                <PinParticipant pinId={6} />{' '}
              </div>
            </Container>
            <Controls />
          </>
        ) : null}
      </main>
    </>
  )
}

export default VideoParty
