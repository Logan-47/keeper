import { UserSessionService } from "../services";
import responseWrapper from "./responseWrapper";
const userSessionService = new UserSessionService();

const getToken = (headers) => {
  let token = headers.authorization || '';

  if (token.startsWith('Bearer ')) {
    token = token.replace('Bearer ', '');
  }

  return token;
}

export const isUserAuthenticated = () => {
  return async (req, res, next) => {
    const token = getToken(req.headers);
    const session = await userSessionService.getByToken(token);
    if(session) {
      const user = session.user
      req.user = user;
      next()
    } else {
      responseWrapper.errorResponse(res, 400, 'Invalid Session', {});
    }
    
  };
}