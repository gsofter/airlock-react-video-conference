import React, { useState } from 'react'
import Container from '@material-ui/core/Container'
import { Typography, Grid, TextField, Button } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.css'
import useStyles from './styles'
import { userDispatch, useSelector } from 'react-redux'
import ConfirmDialog from '../../components/Dialogs/ConfirmDialog'
const DashboardPage = () => {
  const classes = useStyles()
  const userData = useSelector((state) => state.auth)
  const { user, room } = userData
  const [showDeleteDlg, setShowDeleteDlg] = useState(false)
  const handleDeleteRoom = () => {}
  const onClkDelete = (event) => {
    setShowDeleteDlg(true)
  }
  return (
    <Container max-width="lg" className={classes.main}>
      <ConfirmDialog
        isOpen={showDeleteDlg}
        title="Confirm"
        description="Are you sure to delete room? If you click OK, your room will be permanently removed"
        disagreeText="Cancel"
        agreeText="DELETE"
        handleDisagree={() => setShowDeleteDlg(false)}
        handleAgree={() => {
          handleDeleteRoom()
          setShowDeleteDlg(false)
        }}
      />
      <div className={`row ${classes.hero}`}>
        <Typography variant="h3" className={classes.pageTitle}>
          <img src="./assets/brand-logo.png" />
          <span className={classes.username}>{user.user_name}</span>'s Dashboard
        </Typography>
      </div>
      <Grid container className={classes.content}>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          className={classes.leftContent}
        >
          <Typography variant="h4" className={classes.subtitle}>
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
          </form>
        </Grid>
        <Grid
          container
          item
          xs={12}
          sm={12}
          md={6}
          className={classes.rightContent}
          direction="column"
        >
          <Grid item>
            <Typography variant="h4" className={classes.subtitle}>
              Room <span className={classes.roomname}> {room.room_name} </span>
            </Typography>
          </Grid>
          <Grid
            item
            xs
            container
            direction="column"
            spacing={1}
            className="mt-4"
          >
            <Grid container item xs spacing={1}>
              <Grid item xs className={classes.board}>
                AAAA
              </Grid>
              <Grid item xs className={classes.board}>
                AAAA
              </Grid>
            </Grid>
            <Grid container item xs spacing={1}>
              <Grid item xs className={classes.board}>
                AAAA
              </Grid>
              <Grid item xs className={classes.board}>
                AAAA
              </Grid>
            </Grid>
          </Grid>
          <Grid item className="text-center">
            <Button
              variant="contained"
              color="secondary"
              fullWidth
              className={classes.buttonDelete}
              onClick={onClkDelete}
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
