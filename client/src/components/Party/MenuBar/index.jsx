import React from 'react'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
} from '@material-ui/core'
import useStyles from './styles'
const MenuBar = ({ roomTitle, onClkLeft }) => {
  const classes = useStyles()
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
