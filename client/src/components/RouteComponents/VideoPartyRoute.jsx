import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'

const VideoPartyRoute = ({ children, ...rest }) => {
  const twilioData = useSelector((state) => state.twilio)
  return (
    <Route
      {...rest}
      render={({ location }) =>
        twilioData.token ? (
          children
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

export default VideoPartyRoute
