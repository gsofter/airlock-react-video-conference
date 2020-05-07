import React from 'react'
import useParticipants from '../../../hooks/useParticipants'
import { useSelector } from 'react-redux'
import Participant from '.'
import { Button, makeStyles } from '@material-ui/core'
import LockIcon from '@material-ui/icons/Lock'
import MicIcon from '@material-ui/icons/Mic'

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    // width: '100%',
    height: '100%',
    border: '1px solid blue',
  },
  buttonGroup: {
    marginBottom: '0px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'fixed',
    bottom: '0px',
  },
  emptyScene: {
    textAlign: 'center',
    backgroundColor: 'black',
    height: '100%',
    border: '1px solid brown',
    alignItems: 'center',
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
      <div className={classes.mainWrapper}>
        <Participant participant={participants[pin.value]} />
        <div className={classes.buttonGroup}>
          <Button variant="contained" color="secondary">
            <LockIcon />
          </Button>
          <Button variant="contained" color="secondary">
            <MicIcon />
          </Button>
        </div>
      </div>
    )
  }
}

export default PinParticipant
