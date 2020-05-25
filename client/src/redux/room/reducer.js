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
      onMic: false,
    },
    {
      value: 1,
      locked: true,
      onMic: false,
    },
    {
      value: 2,
      locked: false,
      onMic: false,
    },
    {
      value: 3,
      locked: false,
      onMic: false,
    },
    {
      value: 4,
      locked: false,
      onMic: false,
    },
    {
      value: 5,
      locked: false,
      onMic: false,
    },
    {
      value: 6,
      locked: false,
      onMic: false,
    },
    {
      value: 7,
      locked: false,
      onMic: false,
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
