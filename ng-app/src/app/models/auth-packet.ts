export interface AuthPacket {
  jwt: string;
  expirationCountdown: number;
  expiration: number
}
