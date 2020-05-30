import React from 'react'

import './Input.css'
import { PaperPlanIcon } from '../../Icons/Icons'

import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  sendButton: {
    backgroundColor: 'blue',
    marginRight: '10px',
    marginTop: '2px',
    float: 'right',
    textDecoration: 'none',
    background: '#2979FF',
    padding: '10px',
    border: 'none',
    color: '#fff !important',

    '&:focus': {
      outline: 'none',
    },
  },
}))
const Input = ({ sendMessage, setMessage, message }) => {
  const classes = useStyles()
  return (
    <form>
      <input
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={(event) =>
          event.key === 'Enter' ? sendMessage(event) : null
        }
      />
      <button onClick={sendMessage} className={classes.sendButton}>
        Send <PaperPlanIcon />
      </button>
    </form>
  )
}
export default Input
