import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { setAccessToken } from '../../lib/cookie'

let initState = {
  access_code: '',
  name: '',
  my_room_name: '',
}

const userReducer = handleActions(
  {
    [actions.LOGIN_FAILED]: () => {
      setAccessToken('')
      return initState
    },
    [actions.LOGIN_SUCCESS]: (state, action) => {
      const token = action.payload.token
      setAccessToken(token)
      return state
    },

    [actions.SET_USER_DATA]: (state, action) => {
      if (action.payload === null) return initState
      return {
        ...action.payload,
      }
    },

    [actions.CREATE_MY_ROOM]: (state, action) => {
      return {
        ...state,
        my_room_name: action.payload,
      }
    },

    [actions.DELETE_MY_ROOM]: (state) => {
      return {
        ...state,
        my_room_name: '',
      }
    },
  },
  initState,
)
export default userReducer
