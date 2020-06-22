import React from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import LoginRoute from './components/RouteComponents/LoginRoute'
import PublicRoute from './components/RouteComponents/PublicRoute.jsx'
import useAuth from './hooks/useAuth'
import RoomContainer from './containers/RoomContainer/RoomContainer'
import { SnackbarProvider } from 'notistack'

function App() {
  useAuth()
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
          <LoginRoute path="/login">
            <LoginPage />
          </LoginRoute>
          <PublicRoute path="/party">
            <RoomContainer />
          </PublicRoute>
          <Route path="*">
            <Redirect to="/party" />
          </Route>
        </Switch>
      </Router>
    </SnackbarProvider>
  )
}
export default App
