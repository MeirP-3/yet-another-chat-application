import { Box } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import ChatItem from './chat-item';
import { chatInitialState, chatReducer } from './chat.state';
import { ChatActionType, IMessage, lastMessages } from './chat.types';
import NewMessage from './new-message';


export default function Chat({ nickname, socket }: { nickname: string, socket: SocketIOClient.Socket}) {

  const [
    { messages, avatarColorsMap },
    dispatch
  ] = useReducer(
    chatReducer,
    chatInitialState
  );

  useEffect(() => {
    socket.on('last messages', ({ lastMessages }: lastMessages) => {
      dispatch({
        type: ChatActionType.LastMessagesReceived,
        payload: lastMessages
      });
    });

    socket.on('message', (message: IMessage) => {
      dispatch({
        type: ChatActionType.MessageReceived,
        payload: message
      });
    });

    return () => {
      socket.disconnect();
    };

  }, [socket]);

  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(function scrollToBottom() {
    if (
      null !== ref.current
    ) {
      ref
        .current
        .scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const sendMessage = (content: string) => {

    socket.send({ content });

    dispatch({
      type: ChatActionType.MessageSent,
      payload: {
        type: 'message',
        content,
        from: nickname,
        time: Date.now()
      }
    });
  }

  return (
    <>
      <Box overflow="auto" flexGrow={1} paddingRight={2}>
        {
          messages.map((message, index) => (
            <ChatItem
              key={index}
              nickname={nickname}
              message={message}
              avatarColorsMap={avatarColorsMap}
            />
          ))
        }
      </Box>
      <div ref={ref} />
      <NewMessage sendMessage={sendMessage} />
    </>
  );
};