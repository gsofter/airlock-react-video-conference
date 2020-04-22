import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { setAccessToken, getAccessToken } from '../../lib/cookie'
dotenv.config()

let initState = {
  token: '',
  user: {},
  room: {},
}
console.log(initState)

const authReducer = handleActions(
  {
    [actions.LOGIN_START]: (state) => ({ ...state, authorizing: true }),
    [actions.LOGIN_FAILED]: (state) => {
      setAccessToken('')
      return initState
    },
    [actions.LOGIN_SUCCESS]: (state, action) => {
      const token = action.payload.token
      setAccessToken(token)
      return {
        ...state,
        token: token,
        user: {
          ...action.payload.user,
        },
        room: {
          ...action.payload.room,
        },
      }
    },
    [actions.CREATE_ROOM_SUCCESS]: (state, action) => {
      const newRoom = action.payload
      return {
        ...state,
        room: {
          ...state.room,
          ...newRoom,
        },
      }
    },
    [actions.DELETE_ROOM_FAILED]: (state) => {
      return state
    },
    [actions.CONFIG_AUTH]: (state, action) => {
      setAccessToken(action.payload)
      const decoded = jwt.verify(
        action.payload,
        process.env.REACT_APP_AUTH_SECRET,
      )
      return {
        token: action.payload,
        name: decoded.username,
        room: decoded.roomname,
        authorizing: false,
      }
    },
  },
  initState,
)
export default authReducer
