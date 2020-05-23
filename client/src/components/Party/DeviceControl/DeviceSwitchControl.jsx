import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import { purple } from '@material-ui/core/colors'
import Switch from '@material-ui/core/Switch'
import Grid from '@material-ui/core/Grid'
import CameraIcon from '@material-ui/icons/Camera'
import MicIcon from '@material-ui/icons/Mic'
import Typography from '@material-ui/core/Typography'

const IOSSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#52d869',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#52d869',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[200],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  )
})

const DeviceSwitchControl = () => {
  const [state, setState] = React.useState({
    mic: true,
    camera: true,
  })

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked })
  }

  return (
    <>
      <Grid container spacing={2}>
        <Grid item>
          <CameraIcon />
        </Grid>
        <Grid item xs>
          Webcam
        </Grid>
        <Grid item>
          <IOSSwitch
            checked={state.camera}
            onChange={handleChange}
            name="camera"
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item>
          <MicIcon />
        </Grid>
        <Grid item xs>
          Webcam
        </Grid>
        <Grid item>
          <IOSSwitch checked={state.mic} onChange={handleChange} name="mic" />
        </Grid>
      </Grid>
    </>
  )
}

export default DeviceSwitchControl
