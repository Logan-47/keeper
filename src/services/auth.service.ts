import moment from 'moment'
import crypto, { BinaryToTextEncoding } from 'crypto'
import { UserService  } from "./users.service";
import { UserSessionService } from './userSessions.service'
import logger from '../utils/logger'
import { getErrorMessage } from '../utils/loggingHelper'

import { IAuthServiceSignUpUser, IAuthServiceCreateAuthToken } from '../interfaces'

export class AuthService {
  
  private userService: UserService;
  private userSessionService: UserSessionService;
  
  
  constructor(){
    this.userService = new UserService();
    this.userSessionService = new UserSessionService()
  }

  private SALT_BYTE_LENGTH_DEFAULT = 256;
  private ALGO = 'sha256';
  private ENCODING: BinaryToTextEncoding = "base64";
  private TOKEN_EXPIRY_TOKEN_SECONDS = Number(180 * 24 * 3600);

  private getSHAPassword(password: string) {
    const passwordsha = crypto
      .createHash('sha256')
      .update(password)
      .digest('hex');
    return passwordsha;
  }

  private generateSalt = (bytes?: number) => {
    const saltByteLength = bytes || this.SALT_BYTE_LENGTH_DEFAULT;
    return crypto.randomBytes(saltByteLength).toString('hex');
  }

  generateToken(id: number, salt: string): string {
    salt = salt.toString();
    return crypto.createHmac(this.ALGO, id.toString())
      .update(salt)
      .digest(this.ENCODING);
  }

  async createAuthToken({ userId, ttl = this.TOKEN_EXPIRY_TOKEN_SECONDS }: IAuthServiceCreateAuthToken) {
    const salt = this.generateSalt();
    const token = this.generateToken(userId, salt);
    const expiry = moment().add(ttl, 'seconds').toDate();
    try {
      await this.userSessionService.create({
        userId: userId,
        token: token,
        expiry: expiry
      });
      return { token };
    } catch (err) {
      logger.error('Error while creating new token::', { tokenDetails: { userId, ttl } }, err);
      throw err;
    }
  }


  async signupUser({ name, email, password }: IAuthServiceSignUpUser) {
    try {
      const passwordSHA = this.getSHAPassword(password);
      const user = await this.userService.create({
        name,
        email,
        password: passwordSHA,
      });

      return user;
    } catch (err: unknown) {
      logger.error('AuthService::Err::signupUser',{
        message: getErrorMessage(err)
      });
      throw err;
    }
  }

  async loginUser(email: string, password: string) {
    // eslint-disable-next-line no-useless-catch
    try {
      const user = await this.userService.getByEmail(email);
      const userId = Number(user.id);
      if (user) {
        const passwordsha = this.getSHAPassword(password);
        if (passwordsha !== user?.password) {
          throw new Error('Incorrect Password!')
        }
        const authToken = await this.createAuthToken({
          userId: userId,
        });

        const response = {
          name: user.name,
          email: user.email,
          ...authToken,
        }

        return response;
      } else {
        throw new Error("User not found!");
      }
    } catch (err: unknown) {
      throw err;
    }
  }

}