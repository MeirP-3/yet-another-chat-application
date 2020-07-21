import { Box } from '@material-ui/core';
import React, { useEffect, useLayoutEffect, useReducer, useRef } from 'react';
import ChatMassage from './chat-message';
import { chatInitialState, chatReducer } from './chat.state';
import { ChatActionType, IMessage, lastMessages } from './chat.types';
import ConnectionMessage from './connection-message';
import NewMessage from './new-message';


export default function Chat({ nickname, socket }: { nickname: string, socket: SocketIOClient.Socket }) {

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
          messages.map(
            ({ type, from = '', time, content = '', name }, index
            ) => {
              switch (type) {
                case 'message':
                  return (
                    <ChatMassage
                      key={index}
                      nickname={nickname}
                      from={from}
                      time={time}
                      content={content}
                      avatarColorsMap={avatarColorsMap}
                    />
                  );

                case 'user connected':
                case 'user disconnected':
                  return (
                    <ConnectionMessage
                      key={index}
                      type={type}
                      name={name}
                      time={time}
                      nickname={nickname}
                    />
                  );
              }
            })
        }
        <div ref={ref} />
      </Box>

      <NewMessage
        sendMessage={sendMessage}
      />
    </>
  );
};