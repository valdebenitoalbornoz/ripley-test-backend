import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { JWT_PASS } from '../config/settings';

export class UserController {
  constructor() {}
  /* Registra un usuario para una cuenta */
  public register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { name, rut, password } = req.body;

      const exists = await User.findOne({ rut });
      if (exists) {
        return res.status(404).send({
          done: false,
          message: 'Ya existe un usuario con el rut indicado. Intente recuperar contraseña.'
        });
      }
      const encrypted = await bcrypt.hash(password, 10);

      await User.create({
        name,
        rut,
        password: encrypted
      });


      res.status(200).send({ done: true, message: `Usuario creado existosamente: ${ name }` });
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  };

  /** Login */
  public login = async (req: Request, res: Response) => {
    try {
      const { rut, password } = req.body;
      const user = await User.findOne({ rut });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return res.status(401).send({ done: false, message: 'Usuario o contraseña incorrectos' });
      }

      const token = jwt.sign(user.toObject(), JWT_PASS);

      res.status(200).send({ done: true, message: `Bienvenida/o ${user.name}`, token, user });
    } catch (error) {
      res.status(500).send({ done: false, message: error.message });
    }
  };
}
