import React, { useState, useRef, useEffect } from 'react'

const Participant = ({ participant }) => {
  const [audioTracks, setAudioTracks] = useState(null)
  const [videoTracks, setVideoTracks] = useState(null)

  const videoRef = useRef()
  const audioRef = useRef()

  const trackpubsToTracks = (trackMap) =>
    Array.from(trackMap.values())
      .map((publication) => publication.track)
      .filter((track) => track != null)
  useEffect(() => {
    const trackSubscribed = (track) => {
      if (track.kind === 'video')
        setVideoTracks((videoTracks) => [...videoTracks, track])
      else setAudioTracks((audioTracks) => [...audioTracks, track])
    }

    const trackUnsubscribed = (track) => {
      if (track.kind === 'video') {
        setVideoTracks((tracks) => tracks.filter((v) => v !== track))
      } else {
        setAudioTracks((tracks) => tracks.filter())
      }
    }

    setVideoTracks(trackpubsToTracks(participant.videoTracks))
    setAudioTracks(trackpubsToTracks(participant.audioTracks))

    participant.on('trackSubscribed', trackSubscribed)
    participant.on('trackUnsubscribed', trackUnsubscribed)

    return () => {
      setVideoTracks([])
      setAudioTracks([])
      participant.removeAllListeners()
    }
  }, [participant])

  useEffect(() => {
    const videoTrack = videoTrack[0]
    if (videoTrack) {
      videoTrack.attach(videoRef.current)
      return () => {
        videoTrack.detach()
      }
    }
  }, [videoTracks])

  return (
    <div className="participant">
      <h3 className="particiant"> {participant.identity} </h3>
      <video ref={videoRef} autoPlay={true} muted />
      <audio ref={audioRef} autoPlay={true} />
    </div>
  )
}

export default Participant
