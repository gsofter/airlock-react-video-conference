import { handleActions } from 'redux-actions'
import * as actions from './actions'

let initState = {
  access_code: '',
  name: '',
  token: '',
  role: '',
}

const userReducer = handleActions(
  {
    [actions.LOGIN_FAILED]: () => {
      return initState
    },

    [actions.LOGIN_SUCCESS]: (state, action) => {
      if (action.payload === null) return initState
      return {
        ...action.payload,
      }
    },
  },
  initState,
)
export default userReducer
