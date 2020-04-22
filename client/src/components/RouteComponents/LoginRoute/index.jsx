import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginRoute = ({ children, ...rest }) => {
  const { token: accessToken, user_name, room_name } = useSelector(
    (state) => state.auth,
  )
  const isAuthenticated = accessToken ? true : false
  const hasRoom = room_name ? true : false
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuthenticated ? (
          hasRoom ? (
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
