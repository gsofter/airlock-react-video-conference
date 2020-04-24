import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { setAccessToken } from '../../lib/cookie'

let initState = {
  access_code: '',
  name: '',
  isAuth: false,
}

const userReducer = handleActions(
  {
    [actions.LOGIN_START]: (state) => state,
    [actions.LOGIN_FAILED]: () => {
      setAccessToken('')
      return initState
    },
    [actions.LOGIN_SUCCESS]: (state, action) => {
      const token = action.payload.token
      setAccessToken(token)
      return { ...state, isAuth: true }
    },
    [actions.UPDATE_ROOM_NAME]: (state, action) => {
      const room_name = action.payload
      return { ...state, room_name: room_name }
    },
    [actions.SET_USER_DATA]: (state, action) => {
      if (action.payload === null) return initState
      return {
        ...state,
        access_code: action.payload.access_code,
        name: action.payload.name,
      }
    },
  },
  initState,
)
export default userReducer
