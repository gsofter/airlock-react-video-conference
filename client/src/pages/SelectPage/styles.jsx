import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  watch: {
    margin: theme.spacing(3, 0, 2),
  },
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  brand: {
    marginTop: theme.spacing(3),
    textAlign: 'center',
  },
  roomcontainer: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
  brandtext: {
    fontSize: '1.5rem',
  },
}))

export default useStyles
