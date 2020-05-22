import React from 'react'
import useParticipants from '../../../hooks/useParticipants'
import { useSelector } from 'react-redux'
import Participant from '.'
import { Button, makeStyles } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import MicIcon from '@material-ui/icons/Mic'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'

const useStyles = makeStyles((theme) => ({
  pinMainWrapper: {
    height: '100%',
    border: '1px solid blue',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  buttonGroup: {
    marginBottom: '0px',
    display: 'inline-block',
    flexDirection: 'row',
    justifyContent: 'space-between',
    bottom: '0px',
  },
  emptyScene: {
    textAlign: 'center',
    backgroundColor: 'black',
    height: '100%',
    border: '1px solid brown',
    alignItems: 'center',
  },
  lockButton: {
    borderRadius: '0px',
    border: '1px solid grey',
    backgroundColor: 'black',
  },

  micButton: {
    borderRadius: '0px',
    border: '1px solid grey',
    backgroundColor: 'black',
  },

  button: {
    width: '50%',
    color: 'white',
  },
}))

const PinParticipant = ({ pinId }) => {
  const classes = useStyles()
  const participants = useParticipants()
  const roomData = useSelector((state) => state.room)
  const pin = roomData.pins[pinId]
  if (participants.length <= pin.value) {
    return <div className={classes.emptyScene}>Not Available</div>
  } else {
    return (
      <div className={classes.pinMainWrapper}>
        <Participant participant={participants[pin.value]} />
        <div className={classes.buttonGroup}>
          <Button
            variant="outline"
            className={`${classes.lockButton} ${classes.button}`}
          >
            <LockIcon color="white" />
          </Button>
          <Button
            variant="outline"
            className={`${classes.lockButton} ${classes.button}`}
          >
            <MicIcon color="white" />
          </Button>
        </div>
      </div>
    )
  }
}
export default PinParticipant
