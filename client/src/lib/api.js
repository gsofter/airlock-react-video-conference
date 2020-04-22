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
export const deleteRoom = () => {
  const token = getAccessToken()
  return axios.delete(`${endpoint}/delete_room`, {
    headers: { Authorization: `Bearer ${token}` },
  })
}
