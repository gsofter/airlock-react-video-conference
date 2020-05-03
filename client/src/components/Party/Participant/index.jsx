import React from 'react'
// import ParticipantInfo from '../ParticipantInfo/ParticipantInfo'
import ParticipantTracks from './ParticipantTracks'

export default function Participant({ participant, disableAudio }) {
  return (
    // <ParticipantInfo
    //   participant={participant}
    //   onClick={onClick}
    //   isSelected={isSelected}
    // >
    <ParticipantTracks
      participant={participant}
      disableAudio={disableAudio}
      // enableScreenShare={enableScreenShare}
    />
    // </ParticipantInfo>
  )
}
