import React from 'react'
import { makeStyles, TextField, Button } from '@material-ui/core'
import { PaperPlanIcon } from '../Icons/Icons'

const useStyles = makeStyles((theme) => ({
  chatContainer: {
    // display: 'flex',
    // flexDirection: 'column',
  },
  chatHeader: {
    backgroundColor: 'grey',
    height: '50px',
  },
  chatFooter: {
    marginBottom: '0px',
    flexShrink: 1,
    height: '50px',
  },

  messageList: {
    height: 'calc(100% - 100px)',
  },
}))

const MessageList = () => {
  return <div>MessageList</div>
}

const Chat = () => {
  const classes = useStyles()
  return (
    <div className={classes.chatContainer}>
      <div className={classes.chatHeader}> Chat with </div>
      <div className={classes.messageList}>
        <MessageList />
      </div>
      <div className={classes.chatFooter}>
        <div>
          <TextField />
        </div>
        <div>
          <Button variant="contained" color="primary">
            <PaperPlanIcon />
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Chat
