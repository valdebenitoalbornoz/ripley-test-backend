export interface IUser {
    _id?: string;
    /** Rut del usuario */
    rut: string;
    /** Nombre del usuario */
    name: string;
    /** Contraseña encriptada */
    password: string;
}