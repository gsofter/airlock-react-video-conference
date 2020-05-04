import React from 'react'
import DoubleArrowIcon from '@material-ui/icons/DoubleArrow'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@material-ui/core'
import useStyles from './styles'
import useRoomState from '../../../hooks/useRoomState'
const MenuBar = ({ roomTitle, onClkLeft }) => {
  const classes = useStyles()
  const roomState = useRoomState()
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography
          variant="h5"
          color="inherit"
          noWrap
          className={classes.roomTitle}
        >
          <img src="./assets/brand-logo.png" />
          {roomTitle}
        </Typography>
        {roomState === 'disconnected' ? (
          <Button
            variant="contained"
            color="primary"
            className={classes.joinButton}
          >
            <DoubleArrowIcon />
            Join to Party
          </Button>
        ) : (
          ''
        )}
        <Button
          variant="contained"
          color="secondary"
          className={classes.exitButton}
          onClick={onClkLeft}
        >
          <ExitToAppIcon />
          LEFT
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default MenuBar
