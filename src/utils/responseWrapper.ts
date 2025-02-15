/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

class ResponseWrapper {

  private validation = (statusCode: number) => {
    if (statusCode == null) throw new Error("Status Code Missing!!");
  };

  successResponse = (res: Response, statusCode: number, data?: any, message?: string) => {
    this.validation(statusCode);
    if (!data) throw new Error("Data Missing!!");
    
    return res.json({
      data,
      message: message,
      statusCode,
    });
  };

  errorResponse = (res: Response, statusCode: number, errorMessage: any, errObject?: unknown, data?: any) => {
    this.validation(statusCode);
      
    if (!errorMessage) throw new Error("Error Message Missing");

    return res.status(statusCode).json({
      error: true,
      data,
      message: errorMessage,
      statusCode,
    });
  };
}

export default new ResponseWrapper();