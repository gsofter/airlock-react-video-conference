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
      fixed: false,
    },
    {
      value: 1,
      fixed: false,
    },
    {
      value: 2,
      fixed: false,
    },
    {
      value: 3,
      fixed: false,
    },
    {
      value: 4,
      fixed: false,
    },
    {
      value: 5,
      fixed: false,
    },
    {
      value: 6,
      fixed: false,
    },
    {
      value: 7,
      fixed: false,
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
