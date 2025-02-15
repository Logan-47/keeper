import express from 'express'
import { IRouterBase } from "../interfaces";
import { AuthController, authValidations } from '../controllers'
import RequestWrapper from '../utils/requestWrapper';
import ValidateRequestErrors from '../utils/validateRequestMiddleware';

export class AuthRouter implements IRouterBase {

  public router = express.Router()
  private authController = new AuthController();
  
  constructor() {
    this.initRoutes();
  }
  
  initRoutes(): void {
    this.router.post(
      '/signup',
      authValidations.validateSignup(),
      ValidateRequestErrors(),
      RequestWrapper(this.authController.signup)
    )
    this.router.post(
      '/login',
      RequestWrapper(this.authController.login)
    )
  }

}