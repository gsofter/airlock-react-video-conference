import React from 'react'
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles'
import purple from '@material-ui/core/colors/purple'
import green from '@material-ui/core/colors/green'

const theme = createMuiTheme({
  type: 'dark',
  //   palette: {
  //     primary: purple,
  //     secondary: green,
  //   },
  //   status: {
  //     danger: 'orange',
  //   },
})

const AirlockTheme = ({ children }) => {
  return <ThemeProvider theme={theme}> {children}</ThemeProvider>
}

export default AirlockTheme
