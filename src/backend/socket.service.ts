// import { apiConfig } from './backend.config';
export default {}
// import io from 'socket.io-client';


// export const getSocket = (
//   nickname: string,
//   callback: (error: Error | null, socket?: SocketIOClient.Socket) => void
// ) => {
//   if (!socket) {

//   }

//   const socket = io(apiConfig.BACKEND_HOST, { query: { nickname }});

//   socket.once('connect', () => {
//     callback(null, socket);
//   });

//   socket.once('error', (e: Error) => {
//     callback(e);
//   });
// };