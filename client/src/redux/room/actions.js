import { createAction } from 'redux-actions'
import * as api from '../../lib/api'

export const SET_STREAM_URL_SUCCESS = 'SET_STREAM_URL_SUCCESS'
export const SET_STREAM_URL_FAILED = 'SET_STREAM_URL_FAILED'
export const PARTICIPANT_JOINED = 'PARTICIPANT_JOINED'
export const PARTICIPANT_EXIT = 'PARTICIPANT_EXIT'
export const INIT_PARTICIPANTS = 'INIT_PARTICIPANTS'
export const setStreamUrlSuccess = createAction(SET_STREAM_URL_SUCCESS)
export const setStreamUrlFailed = createAction(SET_STREAM_URL_FAILED)
export const participantJoined = createAction(PARTICIPANT_JOINED)
export const participantExit = createAction(PARTICIPANT_EXIT)
export const initParticipants = createAction(INIT_PARTICIPANTS)

export const setStreamUrl = (url) => async (dispatch, getState) => {
  try {
    await api.setStreamUrl(url)
    dispatch(setStreamUrlSuccess(url))
  } catch (e) {
    dispatch(setStreamUrlFailed(url))
    throw e
  }
}
