import { handleActions } from 'redux-actions'
import * as actions from './actions'

let initState = {
  name: '',
  mode: '',
  members: [],
  isOwner: false,
}

const roomReducer = handleActions(
  {
    [actions.JOIN_ROOM_SUCCESS]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    [actions.JOIN_ROOM_FAILED]: () => initState,

    [actions.SET_ROOM_DATA]: (state, action) => {
      if (action.payload === null) return initState
      return {
        ...state,
        name: action.payload.name,
        mode: action.payload.mode,
        members: action.payload.members,
        isOwner: action.payload.isOwner,
      }
    },
    [actions.SET_ROOM_MEMBERS]: (state, action) => {
      return {
        ...state,
        members: [...action.payload],
      }
    },
  },
  initState,
)
export default roomReducer
