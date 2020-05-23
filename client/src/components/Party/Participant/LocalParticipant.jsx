import React from 'react'
import Participant from '.'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { makeStyles, Button, Grid, withStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    height: '100%',
    backgroundColor: '#333333',
    border: '1px solid green',
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'space-between',
  },
  participantWrapper: {
    // height: 'calc(100% - 70px)',
    height: '200px',
  },
  buttonsWrapper: {
    marginBottom: '0px',
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
  const {
    room: { localParticipant },
  } = useVideoPartyContext()

  return (
    <div className={classes.mainWrapper}>
      <div className="participantWrapper">
        <Participant participant={localParticipant} />
      </div>
      <div className="buttonWrapper">
        <ExitButton variant="outlined">
          Exit Party <ExitToAppIcon />
        </ExitButton>
      </div>
    </div>
  )
}

export default LocalParticipant
