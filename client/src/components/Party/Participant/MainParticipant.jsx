import React from 'react'
import useMainSpeaker from '../../../hooks/useMainSpeaker'
import useSelectedParticipant from '../../../hooks/useSelectedParticipant'
import ParticipantTracks from './ParticipantTracks'
import MainParticipantInfo from './MainParticipantInfo'

export default function MainParticipant() {
  const mainParticipant = useMainSpeaker()
  const [selectedParticipant] = useSelectedParticipant()

  const videoPriority = mainParticipant === selectedParticipant ? 'high' : null

  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        disableAudio
        videoPriority={videoPriority}
      />
    </MainParticipantInfo>
  )
}
