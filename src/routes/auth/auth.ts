import { SignUp } from '../../controller/auth/signup';
import express, { Router } from 'express';

class AuthRoutes {
  private router!: Router;

  constructor() {
    this.router = express.Router();
  }
  //'/api/gateway/v1';
  public routes(): Router {
    this.router.post('/auth/signup', SignUp.prototype.create);
    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
