import { createAction } from 'redux-actions'
import * as api from '../../lib/api'

export const SET_STREAM_URL_SUCCESS = 'SET_STREAM_URL_SUCCESS'
export const SET_STREAM_URL_FAILED = 'SET_STREAM_URL_FAILED'
export const PARTICIPANT_JOINED = 'PARTICIPANT_JOINED'
export const PARTICIPANT_EXIT = 'PARTICIPANT_EXIT'
export const INIT_PARTICIPANTS = 'INIT_PARTICIPANTS'
export const SET_TWILIO_ROOM = 'SET_TWILIO_ROOM'
export const SET_PIN_SENT = 'SET_PIN_SENT'
export const SET_PIN_LOCK = 'SET_PIN_LOCK'
export const SET_PIN_MIC = 'SET_PIN_MIC'
export const OPEN_CHAT = 'OPEN_CHAT'
export const CLOSE_CHAT = 'CLOSE_CHAT'
export const setStreamUrlSuccess = createAction(SET_STREAM_URL_SUCCESS)
export const setStreamUrlFailed = createAction(SET_STREAM_URL_FAILED)
export const participantJoined = createAction(PARTICIPANT_JOINED)
export const participantExit = createAction(PARTICIPANT_EXIT)
export const initParticipants = createAction(INIT_PARTICIPANTS)
export const setPinSent = createAction(SET_PIN_SENT)
export const setPinLock = createAction(SET_PIN_LOCK)
export const setPinMic = createAction(SET_PIN_MIC)
export const setTwilioRoom = createAction(SET_TWILIO_ROOM)
export const openChat = createAction(OPEN_CHAT)
export const closeChat = createAction(CLOSE_CHAT)
export const setStreamUrl = (url) => async (dispatch, getState) => {
  try {
    await api.setStreamUrl(url)
    dispatch(setStreamUrlSuccess(url))
  } catch (e) {
    dispatch(setStreamUrlFailed(url))
    throw e
  }
}

export const switchMic = ({ identity, isOn }) => async (dispatch, getState) => {
  try {
    await api.switchMic(identity, isOn)
    dispatch(setPinMic({ identity, isOn }))
  } catch (e) {
    throw e
  }
}

// export const openChatBox = ({identity}) = as
