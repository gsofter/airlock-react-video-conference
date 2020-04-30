import { createAction } from 'redux-actions'
import * as api from '../../lib/api'
export const SET_TWILIO_TOKEN = 'SET_TWILIO_TOKEN'
export const setTwilioToken = createAction(SET_TWILIO_TOKEN)
// export const
export const getTwilioToken = () => async (dispatch) => {
  try {
    const res = await api.getTwilioToken()
    dispatch(setTwilioToken(res.data))
  } catch (e) {
    throw e
  }
}
