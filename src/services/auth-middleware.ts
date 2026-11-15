import { config } from '@gateway/config';
import {
  BadRequestError,
  IAuthPayload,
  NotAuthorizedError,
} from '@SiarhKul/jobber-shared';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

class AuthMiddleWare {
  public verifyUser(req: Request, _res: Response, next: NextFunction): void {
    const token = req.session?.jwt;
    if (!token) {
      throw new NotAuthorizedError(
        'Token is not available. Please login again.',
        'GatewayService verifyUser() method'
      );
    }

    let payload: IAuthPayload;

    try {
      payload = verify(token, `${config.JWT_TOKEN}`) as IAuthPayload;
    } catch {
      throw new NotAuthorizedError(
        'Token is not available. Please login again.',
        'GatewayService verifyUser() method'
      );
    }

    req.currentUser = payload;
    next();
  }

  public checkAuthentication(req: Request, _res: Response, next: NextFunction): void {
    if (!req.currentUser) {
      throw new BadRequestError(
        'Authentication is required to access this route.',
        'GatewayService verifyUser() method'
      );
    }

    next();
  }
}

export const authMiddleWare = new AuthMiddleWare();

