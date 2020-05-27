import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
// import useParticipantWithId from '../../../hooks/useParticipantWithId'
import Participant from '../../Party/Participant/Participant'

const UnlockRequestDialog = ({
  isOpen,
  senderName,
  handleAgree,
  handleDecline,
}) => {
  // const senderParticipant = useParticipantWithId(senderName)
  return (
    <Dialog
      open={isOpen}
      onClose={handleDecline}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description"> */}
        <div>{/* <Participant participant={senderParticipant} /> */}</div>
        <div>{senderName} wants to lock his room with you.</div>
        {/* </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree} color="secondary" variant="contained">
          Agree
        </Button>
        <Button onClick={handleDecline} color="default" variant="contained">
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UnlockRequestDialog
