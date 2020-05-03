import axios from 'axios'
import { getAccessToken } from './cookie'
const endpoint = 'http://192.168.0.130:8081'

/**
 *
 * Return logged user data with passcode
 *
 * @param passcode string
 * @return {* token: string } => token
 */
export const userLogin = async (passcode) =>
  axios.post(`${endpoint}/login`, { passcode })

/**
 *
 * Return user data for token
 *
 * @param
 * @return {* user: {}, room: {}, }
 */
export const checkAuth = async () => {
  const token = getAccessToken()
  console.log('Token', token)
  return axios.get(`${endpoint}/user/get_auth`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Create room
 *
 * @param access_code string
 * @param name  string
 * @param mode  string
 * @return {* ...room }
 */
export const createRoom = (access_code, name, mode) => {
  const token = getAccessToken()
  return axios.post(
    `${endpoint}/room`,
    { access_code, name, mode },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
}

/**
 *
 * Delete room with room_name
 *
 * @param access_code string
 * @param room_name string
 * @return { type: 'SUCCESS' }
 */
export const deleteRoom = (access_code, room_name) => {
  const token = getAccessToken()
  return axios.delete(`${endpoint}/room`, {
    params: { access_code, room_name },
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Join user[acccess_code] to room[room_name]
 *
 * @param access_code
 * @param room_name
 * @return { name: string, mode: string, owner_access_code: string, members:[] isOwner: boolean, }
 */
export const joinRoom = (access_code, room_name) => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/room/join`, {
    params: { access_code, room_name },
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Join user[acccess_code] to random room
 *
 * @param access_code
 * @return { name: string, mode: string, owner_access_code: string, members:[] isOwner: boolean, }
 */
export const joinRandomRoom = (access_code, room_name) => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/room/join_random`, {
    params: { access_code },
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Leave from the current room
 *
 * @param access_code
 * @return {}
 */
export const leaveRoom = (access_code) => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/room/leave`, {
    params: { access_code },
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Return room members for room_name
 *
 * @param room_name
 * @return {}
 */
export const getRoomMembers = (room_name) => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/room/members`, {
    params: { room_name },
    headers: { Authorization: `Bearer ${token}` },
  })
}

/**
 *
 * Return twilio token for user
 *
 * @param
 * @return {* token:string }
 */
export const getTwilioToken = () => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/twilio/token`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
