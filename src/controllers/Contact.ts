import { Request, Response } from 'express';
// Model
import Contact from '../models/Contact';

export class ContactController {
  /** Add a new contact */
  public addContact = async (req: Request, res: Response) => {
    try {
      const { body } = req;
      const { name, rut, email, phone, bank, accountType, accountNumber, owner } = body;

      const exists = await Contact.exists({ bank, accountType, accountNumber, owner });
      if (exists) {
        return res.status(200).send({
          done: false,
          message: 'Ya tiene un destinatario con esa cuenta.'
        });
      }

      const contact = await Contact.create({
        name,
        rut,
        email,
        phone,
        bank,
        accountType,
        accountNumber
      });

      res.status(200).send({
        done: true,
        message: 'Destinatario ingresado exitosamente',
        contact
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}
