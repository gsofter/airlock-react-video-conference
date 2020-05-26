import { handleActions } from 'redux-actions'
import * as actions from './actions'

let initState = {
  stream: {
    url: '',
  },
  dj: '',
  pins: [],
  participants: [],
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

    // Set Participants Joined
    [actions.PARTICIPANT_JOINED]: (state, action) => {
      console.log('ParticipantJoined Param =>', action.payload.participants)
      const newParticipant = action.payload.new
      const pins = [...state.pins]
      const exist = pins.find((pin) => pin.identity === newParticipant.identity)
      if (exist && pins.length < 7) {
        return {
          ...state,
          participants: [...action.payload.participants],
        }
      } else {
        pins.push({
          identity: newParticipant.identity,
          locked: false,
        })
        return {
          ...state,
          participants: [...action.payload.participants],
          pins: pins,
        }
      }
    },

    // Remove Participants Exit
    [actions.PARTICIPANT_EXIT]: (state, action) => {
      console.log('ParticipantExit Param =>', action.payload.participants)
      const oldParticipant = action.payload.old
      const pins = [...state.pins]
      const filteredPins = pins.find(
        (pin) => pin.identity !== oldParticipant.identity,
      )

      return {
        ...state,
        participants: [...action.payload.participants],
        pins: filteredPins,
      }
    },

    [actions.INIT_PARTICIPANTS]: (state, action) => {
      console.log('InitParticipants Param => ', action.payload)
      return {
        ...state,
        participants: [...action.payload.participants],
      }
    },
  },
  initState,
)
export default roomReducer
