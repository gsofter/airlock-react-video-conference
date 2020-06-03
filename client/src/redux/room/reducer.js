import { handleActions } from 'redux-actions'
import * as actions from './actions'

let initState = {
  room: null,
  stream: {
    url: '',
  },
  dj: '',
  pins: [],
  participants: [],
  chatOpen: false,
  chatMember: '',
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
      console.log('ParticipantJoined Param =>', action.payload)
      const participants = [...state.participants, action.payload]
      const newP = action.payload
      const pin = state.pins.find((pin) => pin.identity === newP.identity)
      if (!pin && state.pins.length < 7) {
        return {
          ...state,
          participants: participants,
          pins: [
            ...state.pins,
            {
              identity: newP.identity,
              locked: false,
              sent: false,
              mic: false,
              chat: false,
              chats: [],
            },
          ],
        }
      }
      return {
        ...state,
        participants: participants,
        // pins: [...state.pins, { identity: newP.identity, locked: false }],
      }
    },

    // Remove Participants Exit
    [actions.PARTICIPANT_EXIT]: (state, action) => {
      console.log('ParticipantExit Param =>', action.payload)
      const ext = action.payload
      const participants = [...state.participants]
      const filteredParticipants = participants.filter(
        (p) => p.identity !== ext.identity,
      )
      const filteredPins = state.pins.filter((p) => p.identity !== ext.identity)
      return {
        ...state,
        participants: filteredParticipants ? filteredParticipants : [],
        pins: filteredPins ? filteredPins : [],
        chatOpen: state.chatMember === ext.identity ? false : true,
        chatMember: state.chatMember === ext.identity ? '' : state.chatMember,
      }
    },

    [actions.INIT_PARTICIPANTS]: (state, action) => {
      console.log('InitParticipants Param => ', action.payload)
      return {
        ...state,
        participants: [...action.payload.participants],
      }
    },

    // Set Room Data
    [actions.SET_TWILIO_ROOM]: (state, action) => {
      return {
        ...state,
        room: action.payload,
      }
    },

    // Set Pin Sent
    [actions.SET_PIN_SENT]: (state, action) => {
      console.log('SET_PIN_SENT', action.payload)
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        sent: true,
      }

      return {
        ...state,
        pins,
      }
    },

    // Set Pin Lock
    [actions.SET_PIN_LOCK]: (state, action) => {
      console.log('SET_PIN_LOCK', action.payload)
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        locked: true,
      }

      return {
        ...state,
        pins,
      }
    },

    // Set Pin Mic On
    [actions.SET_PIN_MIC]: (state, action) => {
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        mic: action.payload.isOn,
      }
      return {
        ...state,
        pins,
      }
    },

    [actions.INIT_CHAT_ROOM]: (state, action) => {
      console.log('ACTION INIT_CHAT_ROOM')
      return {
        ...state,
        chatMember: '',
        chatOpen: false,
      }
    },

    [actions.OPEN_CHAT]: (state, action) => {
      console.log('OPEN_CHAT => ', action.payload)
      return {
        ...state,
        chatOpen: true,
        chatMember: action.payload.identity,
      }
    },

    [actions.CLOSE_CHAT]: (state, action) => {
      console.log('CLOSE_CHAT => ', action.payload)
      return {
        ...state,
        chatOpen: false,
        chatMember: '',
      }
    },

    [actions.ADD_MESSAGE]: (state, action) => {
      console.log('ADD_MESSAGE =>', action.payload)
      const pId = action.payload.identity
      const pins = [...state.pins]
      const foundIndex = pins.findIndex((pin) => pin.identity === pId)
      const originPin = pins[foundIndex]
      pins[foundIndex] = {
        ...originPin,
        chats: [
          ...originPin.chats,
          { text: action.payload.message, sent: action.payload.sent },
        ],
      }
      return {
        ...state,
        pins,
      }
    },
  },
  initState,
)
export default roomReducer
