import React from 'react'
import Participant from '.'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  mainWrapper: {
    height: '100%',
    backgroundColor: '#333333',
    border: '1px solid green',
  },
}))
const LocalParticipant = () => {
  const classes = useStyles()
  const {
    room: { localParticipant },
  } = useVideoPartyContext()

  return (
    <div className={classes.mainWrapper}>
      <Participant participant={localParticipant} />
    </div>
  )
}

export default LocalParticipant
