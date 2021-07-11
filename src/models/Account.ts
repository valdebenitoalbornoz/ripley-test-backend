/** 
 * Modelo de Cuenta
 * Las cuentas para efectos de este demo, se crearán en el evento de registro del usuario.
*/

import { Schema, model } from 'mongoose';
import { IAccount } from '../interfaces/Account';

const accountSchema: Schema<IAccount> = new Schema({
    name: String,
    rut: String,
    email: String,
    phone: String,
    bank: String,
    accountType: String,
    accountNumber: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' }
});

export default model<IAccount>('Account', accountSchema);