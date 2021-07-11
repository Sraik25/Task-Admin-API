import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import bcryptjs from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import config from '../config';

interface ILogin {
  email: string;
  password: string;
}

export const authenticationUser: RequestHandler = async (req, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const login: ILogin = req.body;

  const { email, password } = login;

  try {
    let user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: 'El usuario no existe' });

    const passCorrect = await bcryptjs.compare(password, user.password);

    if (!passCorrect) {
      return res.status(400).json({ msg: 'Password Incorrecto' });
    }

    const payload = {
      usuario: {
        id: user.id,
      },
    };

    sign(
      payload,
      config.SECRET_WORD,
      {
        expiresIn: 3600,
      },
      (error, token) => {
        if (error) throw error;

        res.json({ token });
      }
    );
  } catch (error) {
    console.log(error);
  }
};

export const userAuthenticated: RequestHandler = async (req: any, res) => {
  try {
    const user = await User.findById(req.usuario.id).select('-password');
    res.json({ user });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: 'Hubo un error' });
  }
};
