import React from 'react'
import { useHistory } from 'react-router-dom'
import Participant from '.'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles, Button, withStyles } from '@material-ui/core'
import { logout } from '../../../redux/user/actions'
import { useDispatch } from 'react-redux'
const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    height: '100%',
    backgroundColor: '#333333',
    border: '1px solid green',
    height: '100%',
  },
  participantWrapper: {
    height: 'calc(100% - 36px)',
  },
  buttonsWrapper: {
    marginBottom: '0px',
    height: '50px',
  },
}))

const ExitButton = withStyles({
  root: {
    borderRadius: '0px',
    border: '1px solid grey',
    backgroundColor: 'black',
    width: '100%',
    color: 'white',
    fontStyle: 'bold',
  },
})(Button)

const LocalParticipant = () => {
  const classes = useStyles()
  const history = useHistory()
  const dispatch = useDispatch()
  const { room } = useVideoPartyContext()
  const {
    room: { localParticipant },
  } = useVideoPartyContext()

  const onClickExit = (e) => {
    room.disconnect()
    dispatch(logout())
    history.push('/login')
  }

  return (
    <div className={classes.mainWrapper}>
      <div className={classes.participantWrapper}>
        <Participant participant={localParticipant} />
      </div>
      <div className={classes.buttonsWrapper}>
        <ExitButton variant="outlined" onClick={onClickExit}>
          Exit Party <ExitToAppIcon />
        </ExitButton>
      </div>
    </div>
  )
}

export default LocalParticipant
