import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

const UnlockRequestDialog = ({
  isOpen,
  sender,
  handleAgree,
  handleDecline,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleDecline}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogContent>
        {/* <DialogContentText id="alert-dialog-description"> */}
        <div> </div>
        <div>{sender} wants to lock his room with you.</div>
        {/* </DialogContentText> */}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAgree} color="success" variant="contained">
          Agree
        </Button>
        <Button onClick={handleDecline} color="warning" variant="contained">
          Decline
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UnlockRequestDialog
