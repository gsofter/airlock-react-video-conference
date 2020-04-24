import { createAction } from 'redux-actions'
import * as api from '../../lib/api'
export const CREATE_ROOM_SUCCESS = 'CREATE_ROOM_SUCCESS'
export const CREATE_ROOM_FAILED = 'CREATE_ROOM_FAILED'
export const DELETE_ROOM_SUCCESS = 'DELETE_ROOM_SUCCESS'
export const DELETE_ROOM_FAILED = 'DELETE_ROOM_FAILED'
export const JOIN_ROOM_SUCCESS = 'JOIN_ROOM_SUCCESS'
export const JOIN_ROOM_FAILED = 'JOIN_ROOM_FAILED'
export const UPDATE_ROOM = 'UPDATE_ROOM'
export const SET_ROOM_DATA = 'SET_ROOM_DATA' //
export const createRoomSuccess = createAction(CREATE_ROOM_SUCCESS)
export const createRoomFailed = createAction(CREATE_ROOM_FAILED)
export const deleteRoomSuccess = createAction(DELETE_ROOM_SUCCESS)
export const deleteRoomFailed = createAction(DELETE_ROOM_FAILED)
export const joinRoomSuccess = createAction(JOIN_ROOM_SUCCESS)
export const joinRoomFailed = createAction(JOIN_ROOM_FAILED)
export const updateRoom = createAction(UPDATE_ROOM)
export const setRoomData = createAction(SET_ROOM_DATA) //

export const joinRoom = (room_name) => async (dispatch, getState) => {
  try {
    const user = getState().user
    const res = await api.joinRoom(user.access_code, room_name)
    dispatch(joinRoomSuccess(res.data))
  } catch (e) {
    dispatch(joinRoomFailed())
    throw e
  }
}

export const createRoom = (room_name, room_mode) => async (
  dispatch,
  getState,
) => {
  try {
    const auth = getState().user
    const res = await api.createRoom(auth.access_code, room_name, room_mode)
    dispatch(createRoomSuccess(res.data))
  } catch (e) {
    throw e
  }
}

export const deleteRoom = () => async (dispatch, getState) => {
  try {
    console.log('DELETE ROOM ACTION')
    const user = getState().user
    const room = getState().room
    const res = await api.deleteRoom(user.access_code, room.name)
    dispatch(deleteRoomSuccess(res.data))
  } catch (e) {
    throw e
  }
}

export const leaveRoom = () => async (dispatch, getState) => {
  try {
    console.log('DELETE ROOM ACTION')
    const user = getState().user
    const room = getState().room
    const res = await api.deleteRoom(user.access_code, room.name)
    dispatch(deleteRoomSuccess(res.data))
  } catch (e) {
    throw e
  }
}
