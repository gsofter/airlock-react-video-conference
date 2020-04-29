import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginRoute = ({ children, ...rest }) => {
  const userData = useSelector((state) => state.user)
  // const roomData = useSelector((state) => state.room)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.name ? (
          userData.room_name ? (
            <Redirect
              to={{
                pathname: '/dashboard',
                state: { from: location },
              }}
            />
          ) : (
            <Redirect
              to={{
                pathname: '/select',
                state: { from: location },
              }}
            />
          )
        ) : (
          children
        )
      }
    />
  )
}

export default LoginRoute
