import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { setAccessToken, getAccessToken } from '../../lib/cookie'
dotenv.config()

let initState = {
  token: '',
  access_code: '',
  user_name: '',
  room_name: '',
}

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
        ...action.payload.user,
      }
    },
    [actions.CREATE_ROOM_SUCCESS]: (state, action) => {
      const newRoom = action.payload
      return {
        ...state,
        ...action.payload,
      }
    },
    [actions.DELETE_ROOM_FAILED]: (state) => {
      return state
    },
    [actions.DELETE_ROOM_SUCCESS]: (state) => {
      return { ...state, room_name: '' }
    },
  },
  initState,
)
export default authReducer
