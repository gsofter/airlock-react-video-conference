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
import HomePage from './pages/HomePage/HomePage'
import ConnectStreamPage from './pages/ConnectStreamPage/ConnectStreamPage'
import PrivateRoute from './components/RouteComponents/PrivateRoute'

function App() {
  useAuth()
  return (
    <SnackbarProvider maxSnack={3}>
      <Router>
        <Switch>
          <Route path="/home">
            <HomePage />
          </Route>
          <Route path="/connect_stream">
            <ConnectStreamPage />
          </Route>
          <LoginRoute path="/login">
            <LoginPage />
          </LoginRoute>
          <PublicRoute path="/party">
            <RoomContainer />
          </PublicRoute>
          <PrivateRoute path="/room/:RoomName">
            <RoomContainer />
          </PrivateRoute>
          <Route path="*">
            <Redirect to="/home" />
          </Route>
        </Switch>
      </Router>
    </SnackbarProvider>
  )
}
export default App
