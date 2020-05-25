/**
 *
 * Custom Icons
 *
 */

import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faLockOpen,
  faLock,
  faMicrophoneAlt,
  faMicrophoneAltSlash,
} from '@fortawesome/free-solid-svg-icons'
import { faCommentDots } from '@fortawesome/free-regular-svg-icons'

export const LockIcon = () => {
  return <FontAwesomeIcon icon={faLock} />
}
export const UnlockIcon = () => {
  return <FontAwesomeIcon icon={faLockOpen} />
}
export const ChatIcon = () => {
  return <FontAwesomeIcon icon={faCommentDots} />
}
export const MicOnIcon = () => {
  return <FontAwesomeIcon icon={faMicrophoneAlt} />
}
export const MicOffIcon = () => {
  return <FontAwesomeIcon icon={faMicrophoneAltSlash} />
}
