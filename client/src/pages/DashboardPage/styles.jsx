import { makeStyles } from '@material-ui/core'
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

  subtitle: {
    width: '60%',
    textAlign: 'center',
    fontWeight: 800,
    fontFamily: 'Arial',
    minHeight: '5.125rem',
    margin: '0 auto',
  },

  buttonEnter: {
    marginLeft: 'auto',
    marginRight: 'auto',
    width: theme.spacing(60),
    marginTop: theme.spacing(10),
    marginBottom: theme.spacing(10),
  },

  board: {
    border: '1px solid black',
    minHeight: '5rem',
  },

  buttonDelete: {
    // width: theme.spacing(30),
    marginTop: theme.spacing(5),
  },

  buttonLeave: {
    // width: theme.spacing(30),
    marginTop: theme.spacing(5),
    marginLeft: theme.spacing(1),
  },
  username: {
    color: 'rgba(0, 0, 0, 0.4)',
  },
  roomname: {
    color: 'rgba(0, 0, 0, 0.4)',
  },
}))

export default useStyles
