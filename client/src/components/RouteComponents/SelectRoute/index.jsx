import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SelectRoute = ({ children, ...rest }) => {
  const { token: accessToken, user, room } = useSelector((state) => state.auth)
  const isAuthenticated = accessToken ? true : false
  const hasRoom = Object.keys(room).length !== 0 ? true : false
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
            children
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

export default SelectRoute
