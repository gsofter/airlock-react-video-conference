import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import { Typography, Grid, TextField, Button } from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import { useDispatch, useSelector } from 'react-redux'
import ConfirmDialog from '../../components/Dialogs/ConfirmDialog'
import {
  deleteRoom,
  leaveRoom,
  updateRoomMembers,
} from '../../redux/room/actions'
import { getTwilioToken } from '../../redux/twilio/actions'
import useStyles from './styles'
import 'bootstrap/dist/css/bootstrap.css'

const DashboardPage = () => {
  const classes = useStyles()
  const userData = useSelector((state) => state.user)
  const roomData = useSelector((state) => state.room)
  const [showDeleteDlg, setShowDeleteDlg] = useState(false)
  const [showLeaveDlg, setShowLeaveDlg] = useState(false)
  const dispatch = useDispatch()
  const UPDATE_INTERVAL = 1000
  let history = useHistory()
  // const memberList = Array(4).forEach()

  useEffect(() => {
    const timerId = setInterval(() => {
      dispatch(updateRoomMembers())
    }, UPDATE_INTERVAL)

    return () => {
      clearInterval(timerId)
    }
  }, [dispatch])

  const handleDeleteRoom = () => {
    dispatch(deleteRoom())
      .then((res) => {
        console.log('ROOM DELETE SUCCESS')
      })
      .catch((e) => {
        console.log('ROOM DELETE FAILED')
      })
  }

  const handleLeaveRoom = () => {
    dispatch(leaveRoom())
  }
  const onClkDelete = (event) => {
    setShowDeleteDlg(true)
  }

  const onClkLeave = (event) => {
    setShowLeaveDlg(true)
  }

  const onClkEnter = (event) => {
    dispatch(getTwilioToken()).then(() => {
      console.log('GET ACCESS TOKEN SUCCESS')
      history.push('/video_conference')
    })
  }
  return (
    <Container max-width="lg" className={classes.main}>
      <ConfirmDialog
        isOpen={showDeleteDlg}
        title="Are you sure to delete room?"
        description=""
        disagreeText="Cancel"
        agreeText="DELETE"
        handleDisagree={() => setShowDeleteDlg(false)}
        handleAgree={() => {
          handleDeleteRoom()
          setShowDeleteDlg(false)
        }}
      />
      <ConfirmDialog
        isOpen={showLeaveDlg}
        title="Are you sure to leave room?"
        description=""
        disagreeText="Cancel"
        agreeText="Leave"
        handleDisagree={() => setShowLeaveDlg(false)}
        handleAgree={() => {
          handleLeaveRoom()
          setShowLeaveDlg(false)
        }}
      />
      <div className={`row ${classes.hero}`}>
        <Typography variant="h3" className={classes.pageTitle}>
          <img src="./assets/brand-logo.png" alt="brand" />
          <span className={classes.username}>{userData.name}</span>'s Dashboard
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
              Room <span className={classes.roomname}> {roomData.name} </span>
            </Typography>
          </Grid>
          <Grid
            container
            item
            xs
            direction="column"
            spacing={1}
            className="mt-4"
          >
            <Grid container item xs spacing={1}>
              <Grid item xs className={classes.board}>
                {roomData.members.length > 0 ? roomData.members[0].name : ''}
              </Grid>
              <Grid item xs className={classes.board}>
                {roomData.members.length > 1 ? roomData.members[1].name : ''}
              </Grid>
            </Grid>
            <Grid container item xs spacing={1}>
              <Grid item xs className={classes.board}>
                {roomData.members.length > 2 ? roomData.members[2].name : ''}
              </Grid>
              <Grid item xs className={classes.board}>
                {roomData.members.length > 3 ? roomData.members[3].name : ''}
              </Grid>
            </Grid>
          </Grid>
          <Grid container item className="text-center" spacing={1}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              className={classes.buttonDelete}
              onClick={onClkDelete}
            >
              DELETE
            </Button>

            <Button
              variant="contained"
              className={classes.buttonLeave}
              onClick={onClkLeave}
            >
              <ExitToAppIcon />
              LEAVE
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
          onClick={onClkEnter}
        >
          doors are opening in 15 Days : 11 Hours : 33 Minutes
        </Button>
      </Grid>
    </Container>
  )
}

export default DashboardPage
