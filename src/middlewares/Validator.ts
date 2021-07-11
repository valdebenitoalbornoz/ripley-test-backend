import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

export const validate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req).array();
    if (errors && errors.length) {
      return res.status(400)
        .send({
            done: false,
            message: `Se detectaron errores de validación. Revise el formulario`
        });
    }
    next();
  } catch (error) {
    res.status(403).send({ done: false, message: error.message });
  }
};
