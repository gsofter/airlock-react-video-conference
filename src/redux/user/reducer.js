import { handleActions } from 'redux-actions'
import * as actions from './actions'
import { setAccessToken, removeAccessToken } from '../../lib/cookie'

let initState = {
  access_code: '',
  name: '',
  token: '',
  role: '',
}

const userReducer = handleActions(
  {
    [actions.LOGIN_FAILED]: () => {
      removeAccessToken()
      return initState
    },

    [actions.LOGIN_SUCCESS]: (state, action) => {
      if (action.payload === null) return initState
      setAccessToken(action.payload.access_token)
      return {
        ...action.payload,
      }
    },
  },
  initState,
)
export default userReducer
