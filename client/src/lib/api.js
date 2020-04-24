import axios from 'axios'
import { getAccessToken } from './cookie'
const endpoint = 'http://localhost:8081'

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
 * @return {* user: {}, room: {} }
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
 * @return { name: string, mode: string, owner_access_code: string, members:[] isOwner: boolean, }
 */
export const joinRoom = (access_code, room_name) => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/room/join`, {
    params: { access_code, room_name },
    headers: { Authorization: `Bearer ${token}` },
  })
}
