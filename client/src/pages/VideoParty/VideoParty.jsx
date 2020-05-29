import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import useRoomState from '../../hooks/useRoomState'
import { styled } from '@material-ui/core/styles'
import { makeStyles, Typography } from '@material-ui/core'
import PinParticipant from '../../components/Party/Participant/PinParticipant'
import ConfigureDialog from '../../components/Dialogs/ConfigureDialog'
import LocalParticipant from '../../components/Party/Participant/LocalParticipant'
import MainParticipant from '../../components/Party/Participant/MainParticipant'
import LiveStream from '../../components/Party/LiveStream'
import { useDispatch } from 'react-redux'
import * as roomActions from '../../redux/room/actions'
import PartyTabControl from '../../components/Party/PartyTabControl'
import DeviceControl from '../../components/Party/DeviceControl'
// import clsx from 'clsx'
import ButtonControl from '../../components/Party/ButtonControl'
import useConnect from '../../hooks/useConnect/useConnect'
import PusherProvider from '../../components/PusherProvider/PusherProvider'
import { useEffect } from 'react'
import Chat from '../../components/Chat/Chat'
const Container = styled('div')(({ theme }) => ({
  position: 'relative',
  height: '100%',
  display: 'grid',
  gridTemplateColumns: `1fr 1fr 1fr 1fr 1fr 1fr`,
  gridTemplateRows: `1fr 1fr 1fr 1fr 1fr`,
  gap: '5px 5px',
  gridTemplateAreas: `"lg mp mp mp mp ct"
                      "mg mp mp mp mp bt"
                      "mg mp mp mp mp bt"
                      "me mp mp mp mp t7"
                      "t1 t2 t3 t4 t5 t6"`,
}))

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    backgroundColor: '#3f3f3f',
    color: theme.palette.primary.contrastText,
    height: '100%',
    position: 'relative',
  },
  mainViewer: {
    gridArea: 'mp',
    padding: theme.spacing(1),
    backgroundColor: '#343334',
  },
  logo: {
    gridArea: 'lg',
    textAlign: 'center',
    paddingTop: '10px',
  },
  chat: {
    gridArea: 'mg',
    backgroundColor: 'white',
    border: '1px solid red',
    color: 'black',
  },
  me: {
    gridArea: 'me',
  },
  tabControl: {
    gridArea: 'ct',
  },
  deviceContro: {
    gridArea: 'bt',
  },
  t1: {
    gridArea: 't1',
    minWidth: '200px',
  },
  t2: {
    gridArea: 't2',
    minWidth: '200px',
  },
  t3: {
    gridArea: 't3',
    minWidth: '200px',
  },
  t4: {
    gridArea: 't4',
    minWidth: '200px',
  },
  t5: {
    gridArea: 't5',
    minWidth: '200px',
  },
  t6: {
    gridArea: 't6',
    minWidth: '200px',
  },
  t7: {
    gridArea: 't7',
    minWidth: '200px',
  },
  t8: {
    gridArea: 't8',
    minWidth: '200px',
  },
}))

const VideoParty = () => {
  const classes = useStyles()
  const roomState = useRoomState()
  const [tabStatus, setTabStatus] = useState('dj')
  const userData = useSelector((state) => state.user)
  const [showConfigDialog, setShowConfigDialog] = useState(false)
  const dispatch = useDispatch()

  const onConfigureLiveStream = () => {
    setShowConfigDialog(true)
  }

  const setStreamUrl = (url) => {
    console.log(url)
    dispatch(roomActions.setStreamUrl(url))
  }

  const onRandomButton = () => {
    console.log('asdf')
  }

  return (
    <>
      {showConfigDialog ? (
        <ConfigureDialog
          showDialog={showConfigDialog}
          closeDialog={() => setShowConfigDialog(false)}
          setStreamUrl={setStreamUrl}
        />
      ) : null}
      <main className={classes.mainWrapper}>
        {roomState === 'connected' ? (
          <>
            <PusherProvider />
            <Container>
              <div className={classes.mainViewer}>
                {tabStatus === 'dj' ? (
                  // dj view mode
                  <>
                    <LiveStream />
                    <ButtonControl
                      role={userData.role}
                      onConfigureLiveStream={onConfigureLiveStream}
                      onRandomButton={onRandomButton}
                    />
                  </>
                ) : tabStatus === 'fav' ? (
                  // fav view mode
                  <>
                    <MainParticipant />
                    <ButtonControl
                      role={userData.role}
                      onConfigureLiveStream={onConfigureLiveStream}
                      onRandomButton={onRandomButton}
                    />
                  </>
                ) : (
                  // grid view mode
                  <div> This is grid view screen </div>
                )}
              </div>
              <div className={classes.logo}>
                <img src="./assets/white-logo.png" alt="white-logo" />
                <Typography variant="body2">squareparty</Typography>
              </div>
              <div className={classes.chat}>
                <Chat />
              </div>
              <div className={classes.tabControl}>
                <PartyTabControl
                  status={tabStatus}
                  setTabStatus={setTabStatus}
                />
              </div>
              <div className={classes.deviceControl}>
                <DeviceControl tabStatus={tabStatus} />
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
                <PinParticipant pinId={3} />
              </div>
              <div className={classes.t5}>
                <PinParticipant pinId={4} />
              </div>
              <div className={classes.t6}>
                <PinParticipant pinId={5} />
              </div>
              <div className={classes.t7}>
                <PinParticipant pinId={6} />
              </div>
            </Container>
          </>
        ) : (
          <div> Not Connected !</div>
        )}
      </main>
    </>
  )
}

export default VideoParty
