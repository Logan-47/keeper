export interface IAuthServiceSignUpUser {
  name: string,
  email: string,
  password: string
}

export interface IAuthServiceCreateAuthToken {
  userId: number,
  ttl ?: number
}