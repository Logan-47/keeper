import { User } from "../../db/entities"
import { Server } from 'socket.io'

declare module 'express-serve-static-core' {
  interface Request {
    user?: User,
    io?: Server
  }
}