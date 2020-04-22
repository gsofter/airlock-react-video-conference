import { createAction } from 'redux-actions'
import * as api from '../../lib/api'

export const LOGIN_START = 'LOGIN_START'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const CREATE_ROOM = 'CREATE_ROOM'

export const DELETE_ROOM = 'DELETE_ROOM'
export const DELETE_ROOM_FAILED = 'DELETE_ROOM_FAILED'
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS'
export const CONFIG_AUTH = 'CONFIG_AUTH'
export const CHECK_AUTH = 'CHECK_AUTH'

export const loginStart = createAction(LOGIN_START)
export const loginFailed = createAction(LOGIN_FAILED)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const configAuth = createAction(CONFIG_AUTH)

export const checkAuth = () => async (dispatch) => {
  try {
    const res = await api.checkAuth()
    console.log(res)
    dispatch(loginSuccess(res.data))
  } catch (e) {
    dispatch(loginFailed())
    throw e
  }
}
export const loginRequest = (passcode) => async (dispatch) => {
  dispatch(loginStart())
  try {
    const res = await api.userLogin(passcode)
    dispatch(loginSuccess(res.data))
  } catch (e) {
    dispatch(loginFailed())
    throw e
  }
}

export const deleteRoom = () => async (dispatch) => {
  try {
    const res = await api.deleteRoom()
    dispatch(configAuth(res.data))
  } catch (e) {
    throw e
  }
}
