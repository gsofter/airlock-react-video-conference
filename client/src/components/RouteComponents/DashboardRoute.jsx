import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const DashboardRoute = ({ children, ...rest }) => {
  const userData = useSelector((state) => state.user)
  const roomData = useSelector((state) => state.room)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.name ? (
          roomData.name ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: '/select',
                state: { from: location },
              }}
            />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  )
}

export default DashboardRoute
