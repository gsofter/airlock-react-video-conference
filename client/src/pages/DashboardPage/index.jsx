import React from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import {
  Typography,
  Grid,
  Divider,
  TextField,
  Paper,
  Button,
} from '@material-ui/core'
import { makeStyles } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css'

const useStyles = makeStyles((theme) => ({
  main: {
    marginTop: '3rem',
  },
  hero: {
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Arial',
  },
  content: {
    marginTop: '5rem',
  },
  leftContent: {
    padding: theme.spacing(2),
  },
  leftTitle: {
    width: '60%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 800,
    fontFamily: 'Arial',
  },
  leftDescription: {
    marginTop: '1.5rem',
  },
  pageTitle: {
    fontFamily: 'Arial',
    fontWeight: 800,
  },
  form: {
    marginTop: theme.spacing(1),
  },

  formControl: {
    marginTop: theme.spacing(3),
  },

  paper: {
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  rightContent: {
    padding: theme.spacing(2),
  },

  rightTitle: {
    width: '60%',
    textAlign: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    fontWeight: 800,
    fontFamily: 'Arial',
  },

  buttonEnter: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.spacing(60),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },

  borderLine: {
    border: '1px solid black',
  },

  roomTitle: {
    fontFamily: 'arial',
    fontWeight: 800,
    textAlign: 'center',
  },

  buttonDelete: {
    width: theme.spacing(30),
    marginTop: theme.spacing(5),
    marginLeft: 'auto',
    marginRight: 'auto',
  },
}))

const DashboardPage = () => {
  const history = useHistory
  const classes = useStyles()
  return (
    <Container max-width="lg" className={classes.main}>
      <div className={`row ${classes.hero}`}>
        <Typography variant="h3" className={classes.pageTitle}>
          <img src="./assets/brand-logo.png" />
          Room's Dashboard
        </Typography>
      </div>
      <Grid container className={classes.content}>
        <Grid container item xs className={classes.leftContent}>
          <Typography variant="h4" className={classes.leftTitle}>
            invite your friends to join your room.
          </Typography>
          <Typography variant="h6" className={classes.leftDescription}>
            You have to be at least 2 people and max 4 people in a room to be
            able to access the virtual party. <br /> <br />
            All people with the link or the room's name can enter your room.
            <br /> <br /> Share your link or your room's name and wait for your
            friends to join.
            <br />
            <br />
          </Typography>

          <form noValidate className={classes.form}>
            <TextField
              label="LINK"
              variant="outlined"
              value="event.squareparty.com/?ref=1d825664d1"
              fullWidth
              disabled
              className={classes.formControl}
            ></TextField>
            <TextField
              label="LINK"
              variant="outlined"
              value="event.squareparty.com/?ref=1d825664d1"
              fullWidth
              disabled
              className={classes.formControl}
            ></TextField>
          </form>
        </Grid>
        <Grid
          container
          item
          xs
          className={classes.rightContent}
          direction="column"
        >
          <Grid item>
            <Typography variant="h4" className={classes.roomTitle}>
              Room
            </Typography>
          </Grid>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={1}
            className="mt-3"
          >
            <Grid container item xs spacing={1}>
              <Grid item xs className={classes.borderLine}></Grid>
              <Grid item xs className={classes.borderLine}></Grid>
            </Grid>
            <Grid container item xs spacing={1}>
              <Grid item xs className={classes.borderLine}></Grid>
              <Grid item xs className={classes.borderLine}></Grid>
            </Grid>
          </Grid>
          <Grid item className="text-center">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.buttonDelete}
            >
              DELETE
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs className="text-center">
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.buttonEnter}
        >
          doors are opening in 15 Days : 11 Hours : 33 Minutes
        </Button>
      </Grid>
    </Container>
  )
}

export default DashboardPage
