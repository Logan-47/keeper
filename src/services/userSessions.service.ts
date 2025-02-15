import { UserSessionDataProvider } from "../dataProviders/userSessions.dataprovider";
import logger from "../utils/logger";
import { IUserSessionServiceCreateSession } from '../interfaces'
import { getErrorMessage } from "../utils/loggingHelper";

export class UserSessionService {
  private usersessionDP: UserSessionDataProvider;

  constructor() {
    this.usersessionDP = new UserSessionDataProvider();
  }

  create = async (userSessionData: IUserSessionServiceCreateSession) => {
    try {
      const response = await this.usersessionDP.create(userSessionData);
      return response;
    } catch (err: unknown) {
      logger.error(`UserSessionService::Err::Create`,{
        message: getErrorMessage(err)
      });
      throw err;
    }
  }

  getByToken = async (token: string) => {
    try {
      return this.usersessionDP.findByToken(token);
    } catch (err: unknown) {
      logger.error(`UserSessionService::Err::getByToken`,{
        message: getErrorMessage(err)
      });
      throw err;
    }
  }
  

}