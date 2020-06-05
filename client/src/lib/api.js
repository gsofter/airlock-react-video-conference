import axios from 'axios'
import { getAccessToken } from './cookie'
const endpoint = 'https://airlock-server-dev.herokuapp.com'

/**
 *
 * Return identity and twilio_token for user corresponding to passcode
 *
 * @param passcode string
 * @return {* access_code: string, identity: string, token: string }
 */
export const userLogin = async (passcode) =>
  axios.post(`${endpoint}/login`, { passcode })

/**
 *
 * Check auth with cookie
 * if authorized, return user data, if not return null
 *
 */
export const checkAuth = async () => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/user/check_auth`, {
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

/**
 *
 * Set Stream URL
 *
 */
export const setStreamUrl = (url) => {
  return axios.post(
    `${endpoint}/room/set_stream_url`,
    {
      url: url,
    },
    { withCredentials: true },
  )
}

/**
 *
 * UnLock Request
 *
 * @param string to
 */
export const sendUnLockRequest = (to) => {
  const token = getAccessToken()
  console.log('Token => ', token)
  return axios.post(
    `${endpoint}/room/unlock_request`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Lock Request
 *
 * @param string to
 */
export const sendLockRequest = (to) => {
  const token = getAccessToken()
  return axios.post(
    `${endpoint}/room/lock_request`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Lock Accept
 *
 * @param string to
 */
export const unLockAccept = (to) => {
  const token = getAccessToken()
  return axios.post(
    `${endpoint}/room/unlock_accept`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Lock Accept
 *
 * @param string to
 */
export const unLockDecline = (to) => {
  const token = getAccessToken()
  return axios.post(
    `${endpoint}/room/unlock_decline`,
    {
      to,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}

/**
 *
 * Set Mic On
 *
 * @param string to
 * @param boolean micOn
 */
export const switchMic = (to, micOn) => {
  const token = getAccessToken()
  return axios.get(`${endpoint}/room/mic`, {
    params: {
      to,
      mic_on: micOn,
    },
    withCredentials: true,
  })
}

export const sendMessage = (to, message) => {
  const token = getAccessToken()
  return axios.post(
    `${endpoint}/room/message`,
    {
      to,
      message,
    },
    { headers: { Authorization: `Bearer ${token}` } },
  )
}
