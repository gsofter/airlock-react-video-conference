import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
} from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  header: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}))
const ConnectStreamPage = () => {
  const classes = useStyles()
  return (
    <>
      <div className={classes.header}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              <img src="assets/logo-blue.png" alt="logo-blue" />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Square
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
      <main></main>
    </>
  )
}

export default ConnectStreamPage
