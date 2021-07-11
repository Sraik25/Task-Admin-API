import { RequestHandler } from 'express';
import User from '../models/User';
import bcryptjs from 'bcryptjs';
import { validationResult } from 'express-validator';
import { sign } from 'jsonwebtoken';
import config from '../config';

interface IUser {
  nameUser: string;
  email: string;
  password: string;
  registro?: Date;
}

export const createUser: RequestHandler = async (req, res) => {
  // validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errores: errors.array() });
  }

  const newUser: IUser = req.body;
  console.log(newUser);

  const { email, password } = newUser;
  try {
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({
        msg: 'El usuario ya existe',
      });
    }

    user = new User(newUser);

    const salt = await bcryptjs.genSalt(10);
    user.password = await bcryptjs.hash(password, salt);

    await user.save();

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

    // res.send({
    //   msg: 'Usuario creado correctamente',
    // });
  } catch (error) {
    console.log(error);
    res.status(400).send('Hubo un error');
  }
};
