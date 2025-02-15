import { Request, Response } from 'express';
import { AuthService } from '../../services'
import responseWrapper from '../../utils/responseWrapper';
import { getErrorMessage } from '../../utils/loggingHelper';


export class AuthController {

  private authService: AuthService;
  

  constructor() {
    this.authService = new AuthService();
  }

  signup = async (req: Request, res: Response) => {
    try {
      const { email, password, name }: {
        email: string,
        password: string,
        name: string
      } = req.body;
      const response = await this.authService.signupUser({name, email, password});
      return responseWrapper.successResponse(res, 200, response);
    } catch (err: unknown) {
      return responseWrapper.errorResponse(
        res,
        500,
        getErrorMessage(err),
        err
      );
    }
  }

  login = async (req: Request, res: Response) => {
    try {
      const { body = {} } = req;
      const { email, password } = body;
      const response = await this.authService.loginUser(email, password);
      return responseWrapper.successResponse(res, 200, response);
    } catch (err: unknown) {
      return responseWrapper.errorResponse(
        res,
        500,
        getErrorMessage(err),
        err,
      );
    }
  }

}