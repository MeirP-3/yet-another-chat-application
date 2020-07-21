import { ChatAction, ChatActionType, ChatState, IMessage } from "./chat.types";
import pickColor from "./avatar-colors";

export const chatInitialState: ChatState = { messages: [], avatarColorsMap: {} };

export const chatReducer = (
  
  { messages, avatarColorsMap }: ChatState,

  { type, payload }: ChatAction

): ChatState => {
  
  switch (type) {
    case ChatActionType.MessageSent:
    case ChatActionType.MessageReceived:
      const { from } = payload;

      if (!avatarColorsMap[from]) {
        avatarColorsMap[from] = pickColor();
      }

      return {
        avatarColorsMap,
        messages: [
          ...messages,
          payload
        ]
      };

    case ChatActionType.LastMessagesReceived:
      payload.forEach(({ type, from = '' }: IMessage) => {
        if (type !== 'message') {
          return;
        }

        if (!avatarColorsMap[from]) {
          avatarColorsMap[from] = pickColor();
        }
      });

      return {
        avatarColorsMap,
        messages: [
          ...payload,
          ...messages
        ]
      };

    default: throw new Error('Chat reducer received actions with wrong type');
  }
};