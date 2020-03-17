import { User } from '../user';

export class AuthPacket extends User {
  user: User
  jwt: string;
  expirationCountdown: number;
  expiration: number
}
