/** 
 * Modelo de Usuarios
*/

import { Schema, model } from 'mongoose';
import { IUser } from '../interfaces/User';

const userSchema: Schema<IUser> = new Schema({
    rut: String,
    name: String,
    password: String
});

export default model<IUser>('User', userSchema);