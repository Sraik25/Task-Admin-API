import { Router } from 'express';
import * as userControl from '../controllers/userController';
import { check } from 'express-validator';

const userRouter = Router();

userRouter.post(
  '/',
  [
    check('nameUser', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe ser minimo de 6 caracteres').isLength({
      min: 6,
    }),
  ],
  userControl.createUser
);

export default userRouter;
