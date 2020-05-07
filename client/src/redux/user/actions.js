import { createAction } from 'redux-actions'
import * as api from '../../lib/api'
import { setRoomData } from '../room/actions'

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const CHECK_AUTH = 'CHECK_AUTH'
export const SET_USER_DATA = 'SET_USER_DATA'
export const DELETE_MY_ROOM = 'DELETE_MY_ROOM'
export const CREATE_MY_ROOM = 'CREATE_MY_ROOM'

export const loginFailed = createAction(LOGIN_FAILED)
export const loginSuccess = createAction(LOGIN_SUCCESS)
export const setUserData = createAction(SET_USER_DATA)
export const deleteMyRoom = createAction(DELETE_MY_ROOM)
export const createMyRoom = createAction(CREATE_MY_ROOM)

export const checkAuth = () => async (dispatch, getState) => {
  try {
    const res = await api.checkAuth()
    console.log(res.data)
    dispatch(loginSuccess(res.data))
  } catch (e) {
    dispatch(loginFailed())
    throw e
  }
}

export const loginRequest = (passcode) => async (dispatch) => {
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
