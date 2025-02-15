import { UserDataProvider } from '../dataProviders'
import { IUserCreateData } from '../interfaces'
import logger from '../utils/logger';
import { getErrorMessage } from '../utils/loggingHelper';

export class UserService {
  
  private userDP: UserDataProvider;

  constructor() {
    this.userDP = new UserDataProvider();
  }

  create = async (userData: IUserCreateData) => {
    try {
      const response = await this.userDP.create(userData);
      return response;
    } catch (err: unknown) {
      logger.error('UserService::Err::Create',{
        message: getErrorMessage(err)
      })
      throw err;
    }
  }

  getByEmail = async (email: string) => {
    try {
      const response = await this.userDP.findOneByEmail(email);
      return response;
    } catch (err: unknown) {
      logger.error("UserService::getByEmail", {
        message: getErrorMessage(err)
      })
      throw err;
    }
  }

}