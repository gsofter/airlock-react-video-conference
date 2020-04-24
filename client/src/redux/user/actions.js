import { createAction } from 'redux-actions'
import * as api from '../../lib/api'
import { setRoomData } from '../room/actions'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const CONFIG_AUTH = 'CONFIG_AUTH'
export const CHECK_AUTH = 'CHECK_AUTH'
export const UPDATE_ROOM_NAME = 'UPDATE_ROOM_NAME'
export const SET_USER_DATA = 'SET_USER_DATA'

export const loginStart = createAction(LOGIN_START)
export const loginFailed = createAction(LOGIN_FAILED)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const configAuth = createAction(CONFIG_AUTH)
export const updateRoomName = createAction(UPDATE_ROOM_NAME)
export const setUserData = createAction(SET_USER_DATA)

export const checkAuth = () => async (dispatch, getState) => {
  try {
    const res = await api.checkAuth()
    console.log(res.data.user)
    dispatch(setUserData(res.data.user))
    dispatch(setRoomData(res.data.room))
  } catch (e) {
    dispatch(loginFailed())
    throw e
  }
}

export const loginRequest = (passcode) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const res = await api.userLogin(passcode)
    console.log(res.data)
    dispatch(loginSuccess(res.data))
  } catch (e) {
    console.log('ACTION - LOGIN FAILED')
    dispatch(loginFailed())
    throw e
  }
}
