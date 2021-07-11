import { Router } from 'express';
import { check } from 'express-validator';
import * as authControl from '../controllers/authController';
import auth from '../middleware/auth';

const authRouter = Router();

authRouter.post(
  '/',
  [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  authControl.authenticationUser
);

authRouter.get('/', auth, authControl.userAuthenticated);

export default authRouter;
