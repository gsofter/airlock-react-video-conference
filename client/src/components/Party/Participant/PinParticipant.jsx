import React from 'react'
import useParticipants from '../../../hooks/useParticipants/useParticipants'
import { useSelector, useDispatch } from 'react-redux'
import Participant from './Participant'
import { Button, makeStyles, withStyles } from '@material-ui/core'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'
import LocalVideoPreview from '../LocalVideoPreview'
import VideoTrack from '../tracks/VideoTrack'
import {
  UnlockIcon,
  ChatIcon,
  LockIcon,
  MicOnIcon,
  CheckIcon,
} from '../../Icons'
import * as api from '../../../lib/api'
import usePinParticipant from '../../../hooks/usePinParticipant/usePinParticipant'
import usePin from '../../../hooks/usePin/usePin'
import { setPinSent } from '../../../redux/room/actions'
const useStyles = makeStyles((theme) => ({
  pinMainWrapper: {
    height: '100%',
    border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  videoWrapper: {
    height: 'calc(100% - 40px)',
  },

  buttonGroup: {
    display: 'flex',
    marginBottom: '0px',
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '40px',
  },
  emptyScene: {
    textAlign: 'center',
    backgroundColor: 'black',
    height: '100%',
    border: '1px solid brown',
    alignItems: 'center',
  },

  button: {
    width: '50%',
    color: 'white',
  },
}))

const LockButton = withStyles({
  root: {
    color: '#80FF00',
    border: '1px solid grey',
    borderRadius: '0px',
    backgroundColor: 'black',
    flex: 1,
  },
})(Button)

const UnlockButton = withStyles({
  root: {
    color: '#00ECF8',
    border: '1px solid grey',
    borderRadius: '0px',
    backgroundColor: 'black',
    flex: 1,
  },
})(Button)

const MicButton = withStyles({
  root: {
    color: '#FF0058',
    border: '1px solid grey',
    borderRadius: '0px',
    backgroundColor: 'black',
    flex: 1,
  },
})(Button)

const ChatButton = withStyles({
  root: {
    color: 'white',
    border: '1px solid grey',
    borderRadius: '0px',
    backgroundColor: 'black',
    flex: 1,
  },
})(Button)

const PinParticipant = ({ pinId }) => {
  const classes = useStyles()
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.user)
  const roomData = useSelector((state) => state.room)
  const participants = roomData.participants
  const pins = roomData.pins
  const pin = pins[pinId]
  if (!pin) return <div className={classes.emptyScene}> not Available</div>
  const pinParticipant = participants.find((p) => p.identity === pin.identity)

  const onLockRequest = async () => {
    const from = userData.identity
    const to = pinParticipant.identity
    await api.lockRequest(from, to)
    dispatch(setPinSent({ identity: to }))
  }

  // when id overflow the length of pins
  if (!!pinParticipant) {
    return (
      <div className={classes.pinMainWrapper}>
        <div className={classes.videoWrapper}>
          <Participant participant={pinParticipant} />
        </div>
        {pin.locked === true ? (
          <div className={classes.buttonGroup}>
            <MicButton variant="outline">
              <MicOnIcon color="white" />
            </MicButton>
            <ChatButton variant="outline">
              <ChatIcon />
            </ChatButton>
            <LockButton variant="outline">
              <LockIcon />
            </LockButton>
          </div>
        ) : pin.sent === false ? (
          <div className={classes.buttonGroup}>
            <UnlockButton variant="outline" onClick={onLockRequest}>
              <UnlockIcon />
            </UnlockButton>
          </div>
        ) : (
          <div className={classes.buttonGroup}>
            <UnlockButton variant="outline">
              <CheckIcon />
            </UnlockButton>
          </div>
        )}
      </div>
    )
  } else {
    return <div className={classes.emptyScene}>Not Available</div>
  }
}
export default PinParticipant
