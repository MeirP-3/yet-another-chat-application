export interface IMessage {
  time: number
  type?: 'message' | 'user connected' | 'user disconnected'
  from?: string
  content?: string
  name?: string
};

export interface IMessagesProps {
  messages: IMessage[]
};

export interface INewMessageProps {
  sendMessage: (value: string) => void
};

export enum ChatActionType {
  MessageReceived = '[CHAT_ACTION] Message received',
  MessageSent = '[CHAT_ACTION] Message sent',
  LastMessagesReceived = '[CHAT_ACTION] Last messages reveived',
};

export interface ChatAction {
  type: ChatActionType,
  payload: any
};

export interface ChatState {
  messages: IMessage[],
  avatarColorsMap: { [key: string]: string }
}

export interface IChatMessageProps {
  from: string,
  time: number,
  content: string,
  nickname: string,
  avatarColorsMap: any
};

export type lastMessages = {
  lastMessages: IMessage[]
};