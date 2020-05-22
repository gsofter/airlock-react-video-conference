import { createAction } from 'redux-actions'
import * as api from '../../lib/api'

export const SET_STREAM_URL_SUCCESS = 'SET_STREAM_URL_SUCCESS'
export const SET_STREAM_URL_FAILED = 'SET_STREAM_URL_FAILED'
export const setStreamUrlSuccess = createAction(SET_STREAM_URL_SUCCESS)
export const setStreamUrlFailed = createAction(SET_STREAM_URL_FAILED)

export const setStreamUrl = (url) => async (dispatch, getState) => {
  try {
    await api.setStreamUrl(url)
    dispatch(setStreamUrlSuccess(url))
  } catch (e) {
    dispatch(setStreamUrlFailed(url))
    throw e
  }
}
