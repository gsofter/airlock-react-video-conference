import axios from 'axios'
import { getAccessToken } from './cookie'
const endpoint = 'http://localhost:8081'
export const userLogin = async (passcode) =>
  axios.post(`${endpoint}/login`, { passcode })

export const checkAuth = async () => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/user`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}

export const createRoom = (token, access_code, name, mode) => {
  return axios.post(
    `${endpoint}/room`,
    { access_code, name, mode },
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  )
}
export const deleteRoom = (access_code, room_name) => {
  const token = getAccessToken()
  console.log('access_code', access_code)
  console.log('room_name', room_name)
  return axios.delete(`${endpoint}/room`, {
    params: { access_code, room_name },
    headers: { Authorization: `Bearer ${token}` },
  })
}
