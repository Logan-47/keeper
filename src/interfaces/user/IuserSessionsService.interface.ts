export interface IUserSessionServiceCreateSession {
  userId: number,
  token: string,
  expiry: Date
}