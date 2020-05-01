import { useCallback, useEffect, useState } from 'react'
import Video from 'twilio-video'

export function useLocalAudioTrack() {
  const [track, setTrack] = useState()

  useEffect(() => {
    Video.createLocalAudioTrack().then((newTrack) => {
      console.log('newAudioTrack =>', newTrack)
      setTrack(newTrack)
    })
  }, [])

  useEffect(() => {
    console.log('Audio track => ', track)
    const handleStopped = () => setTrack(undefined)
    if (track) {
      track.on('stopped', handleStopped)
      return () => {
        console.log('AUDIO TRACK STOPPED')
        track.off('stopped', handleStopped)
      }
    }
  }, [track])

  return track
}

export function useLocalVideoTrack() {
  const [track, setTrack] = useState()

  const getLocalVideoTrack = useCallback(
    () =>
      Video.createLocalVideoTrack({
        frameRate: 24,
        height: 720,
        width: 1280,
        name: 'camera',
      }).then((newTrack) => {
        console.log('newVideoTrack => ', newTrack)
        setTrack(newTrack)
        return newTrack
      }),
    [],
  )

  useEffect(() => {
    // We get a new local video track when the app loads.
    getLocalVideoTrack()
  }, [getLocalVideoTrack])

  useEffect(() => {
    console.log('localVideoTrack => ', track)
    const handleStopped = () => setTrack(undefined)
    if (track) {
      track.on('stopped', handleStopped)
      return () => {
        console.log('VIDEO TRACK STOPPED')
        track.off('stopped', handleStopped)
      }
    }
  }, [track])

  return [track, getLocalVideoTrack]
}

export default function useLocalTracks() {
  const audioTrack = useLocalAudioTrack()
  const [videoTrack, getLocalVideoTrack] = useLocalVideoTrack()

  const localTracks = [audioTrack, videoTrack].filter(
    (track) => track !== undefined,
  )

  return { localTracks, getLocalVideoTrack }
}
