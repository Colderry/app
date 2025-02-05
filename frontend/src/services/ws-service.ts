import io from 'socket.io-client';
import { WS } from '../types/ws';

const ws = (io as any).connect(process.env.REACT_APP_ROOT_API_URL, {
  secure: true,
  path: `/ws`,
  transports: ['websocket', 'polling', 'flashsocket'],
});

ws.io.on('open', () => console.log('Connected to WS Server'));

export default ws as WSClient;

interface WSClient {
  emit: <K extends keyof WS.To>(event: K, callback: (args: WS.To[K]) => any) => any;
  on: <K extends keyof WS.From>(event: K | 'error' | 'disconnect', callback: (args: WS.From[K]) => any) => any;
  off: (event: string, callback?: any) => any;
  disconnect: () => any;
}