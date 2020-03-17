import { AuthPacket } from './auth-packet';

export interface User extends AuthPacket {
  name: string;
  email: string;
  role: string;
}
