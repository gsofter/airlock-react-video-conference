import React from 'react'
import { Participant, Track } from 'twilio-video'
import usePublications from '../../../hooks/usePublications'
import useVideoPartyContext from '../../../hooks/useVideoPartyContext'

/*
 *  The object model for the Room object (found here: https://www.twilio.com/docs/video/migrating-1x-2x#object-model) shows
 *  that Participant objects have TrackPublications, and TrackPublication objects have Tracks.
 *
 *  The React components in this application follow the same pattern. This ParticipantTracks component renders Publications,
 *  and the Publication component renders Tracks.
 */

export default function ParticipantTracks({ participant, disableAudio }) {
  const { room } = useVideoPartyContext()
  const publications = usePublications(participant)
  const isLocal = participant === room.localParticipant

  let filteredPublications

  filteredPublications = publications.filter((p) => p.trackName !== 'screen')
  return (
    <>
      {filteredPublications.map((publication) => (
        <Publication
          key={publication.kind}
          publication={publication}
          participant={participant}
          isLocal={isLocal}
          disableAudio={disableAudio}
        />
      ))}
    </>
  )
}
