import axios from 'axios'
import { getAccessToken } from './cookie'
const endpoint = 'http://localhost:5000'

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
  return axios.get(`${endpoint}/user/check_auth`, { withCredentials: true })
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
  return axios.post(
    `${endpoint}/room/unlock_request`,
    {
      to,
    },
    { withCredentials: true },
  )
}

/**
 *
 * Lock Request
 *
 * @param string to
 */
export const sendLockRequest = (to) => {
  return axios.post(
    `${endpoint}/room/lock_request`,
    {
      to,
    },
    { withCredentials: true },
  )
}

/**
 *
 * Lock Accept
 *
 * @param string to
 */
export const unLockAccept = (to) => {
  return axios.post(
    `${endpoint}/room/unlock_accept`,
    {
      to,
    },
    { withCredentials: true },
  )
}

/**
 *
 * Lock Accept
 *
 * @param string to
 */
export const unLockDecline = (to) => {
  return axios.post(
    `${endpoint}/room/unlock_decline`,
    {
      to,
    },
    { withCredentials: true },
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
  return axios.get(`${endpoint}/room/mic`, {
    params: {
      to,
      mic_on: micOn,
    },
    withCredentials: true,
  })
}

export const sendMessage = (to, message) => {
  return axios.post(
    `${endpoint}/room/message`,
    {
      to,
      message,
    },
    { withCredentials: true },
  )
}
