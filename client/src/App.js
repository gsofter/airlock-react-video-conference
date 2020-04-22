import React, { useEffect } from 'react'
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Redirect,
} from 'react-router-dom'
import SelectPage from './pages/SelectPage'
import LoginPage from './pages/LoginPage'
import DashboardPage from './pages/DashboardPage'
import SelectRoute from './components/RouteComponents/SelectRoute'
import DashboardRoute from './components/RouteComponents/DashboardRoute'
import LoginRoute from './components/RouteComponents/LoginRoute'
import { useDispatch } from 'react-redux'
import { checkAuth } from './redux/auth/actions'
function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(checkAuth())
  }, [dispatch])

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/select"></Redirect>
        </Route>
        <SelectRoute exact path="/select">
          <SelectPage />
        </SelectRoute>
        <DashboardRoute path="/dashboard">
          <DashboardPage />
        </DashboardRoute>
        <LoginRoute path="/login">
          <LoginPage />
        </LoginRoute>
      </Switch>
    </Router>
  )
}
export default App
