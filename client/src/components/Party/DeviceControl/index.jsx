import React from 'react'
import VolumeControl from './VolumeControl'
import DeviceSwitchControl from './DeviceSwitchControl'
import { Grid, Typography, makeStyles } from '@material-ui/core'
import useParticipants from '../../../hooks/useParticipants/useParticipants'
const useStyles = makeStyles((theme) => ({
  participantInfo: {
    color: 'cyan',
  },
}))
const DeviceControl = ({ tabStatus }) => {
  const classes = useStyles()
  const participants = useParticipants()
  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <Typography>
            participants (
            <span className={classes.participantInfo}>
              {participants.length}
            </span>
            )
          </Typography>
        </Grid>
      </Grid>
      <VolumeControl />
      <DeviceSwitchControl />
    </>
  )
}

export default DeviceControl
