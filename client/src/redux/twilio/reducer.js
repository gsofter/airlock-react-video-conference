import { handleActions } from 'redux-actions'
import * as actions from './actions'
const initState = {
  token: '',
}

const twilioReducer = handleActions(
  {
    [actions.SET_TWILIO_TOKEN]: (state, action) => {
      return { token: action.payload }
    },
  },
  initState,
)

export default twilioReducer
