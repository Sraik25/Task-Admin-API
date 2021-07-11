import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import config from '../config';

export default function (req: any, res: Response, next: NextFunction) {
  const token: any = req.header('x-auth-token');
  console.log(token);

  if (!token) {
    res.status(401).json({ msg: ' No hay Token, permiso no válido' });
  }

  try {
    const cifrado: any = verify(token, config.SECRET_WORD);
    req.usuario = cifrado.usuario;
    next();
  } catch (error) {
    res.status(401).json({ msg: ' Token no válido' });
  }
}
