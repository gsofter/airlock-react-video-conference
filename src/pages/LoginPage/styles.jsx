import { makeStyles } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    textAlign: 'center',
    // marginTop: theme.spacing(1),
  },
  submit: {
    // margin: theme.spacing(3, 0, 2),
    padding: theme.spacing(1.5),
  },
  logoImg: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    maxWidth: theme.spacing(10),
    maxHeight: theme.spacing(10),
  },
  formTitle: {
    fontWeight: '700',
  },
}))

export default useStyles
