import { io } from 'socket.io-client';
import { host } from './env';

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? undefined : host;

export const socket = io(URL);