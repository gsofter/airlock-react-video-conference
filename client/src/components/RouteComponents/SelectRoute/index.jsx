import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const SelectRoute = ({ children, ...rest }) => {
  const userData = useSelector((state) => state.user)
  const roomData = useSelector((state) => state.room)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData.name ? (
          roomData.name ? (
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
