import { Request, Response } from 'express';
// Model
import Contact from '../models/Contact';

export class ContactController {
  /** Add a new contact */
  public addContact = async (req: Request, res: Response) => {
    try {
      const { name, rut, email, phone, bank, accountType, accountNumber } = req.body;
      const owner = res.locals._user?._id;
      const exists = await Contact.exists({ owner, bank, accountType, accountNumber });
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
        accountNumber,
        owner
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

  /** Get all contacts of one user */
  public getContacts = async (req: Request, res: Response) => {
    try {
      const id = res.locals._user?._id;
      if (!id) {
        throw new Error('Usuario no identificado');
      }
      const contacts = await Contact.find({ owner: id });
      res.status(200).send({ done: true, contacts, id });
    } catch (error) {
      res.status(500).send({ error });
    }
  };

}
