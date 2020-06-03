import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendMessage, initChatRoom } from '../../redux/room/actions'
import Chat from '../../components/Chat/Chat'

const ChatContainer = () => {
  const roomData = useSelector((state) => state.room)
  const myIdentity = useSelector((state) => state.user.identity)

  const chatOpponent = roomData.pins.find(
    (p) => p.identity === roomData.chatMember,
  )
  const messages = chatOpponent && chatOpponent.chats ? chatOpponent.chats : []
  const dispatch = useDispatch()
  const handleSendMessage = (msg) => {
    console.log('MSG TEXT => ', msg)
    dispatch(sendMessage({ identity: roomData.chatMember, message: msg }))
  }

  return (
    <>
      {chatOpponent && roomData.chatOpen ? (
        <Chat
          me={myIdentity}
          opponent={chatOpponent.identity}
          messages={messages}
          handleSendMessage={handleSendMessage}
        />
      ) : null}
    </>
  )
}

export default ChatContainer
