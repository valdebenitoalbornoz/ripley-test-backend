/** 
 * Modelo de Contactos (Destinatarios)
 * TODO: Sugeriría usar un modelo de contactos multicuenta .
*/

import { Schema, model } from 'mongoose';
import { IContact } from '../interfaces/Contact';

const contactSchema: Schema<IContact> = new Schema({
    name: String,
    rut: String,
    email: String,
    phone: String,
    bank: String,
    accountType: String,
    accountNumber: String
});

export default model<IContact>('Contact', contactSchema);