import { handleActions } from 'redux-actions'
import * as actions from './actions'

let initState = {
  stream: {
    url: '',
  },
  dj: '',
  pins: [
    {
      value: 0,
      locked: false,
    },
    {
      value: 1,
      locked: false,
    },
    {
      value: 2,
      locked: false,
    },
    {
      value: 3,
      locked: false,
    },
    {
      value: 4,
      locked: false,
    },
    {
      value: 5,
      locked: false,
    },
    {
      value: 6,
      locked: false,
    },
    {
      value: 7,
      locked: false,
    },
  ],
}

const roomReducer = handleActions(
  {
    // Set Stream URL
    [actions.SET_STREAM_URL_SUCCESS]: (state, action) => {
      return {
        ...state,
        stream: {
          url: action.payload,
        },
      }
    },

    // Set Stream URL as null
    [actions.SET_STREAM_URL_FAILED]: (state, action) => {
      return {
        ...state,
        stream: {
          url: '',
        },
      }
    },
  },
  initState,
)
export default roomReducer
