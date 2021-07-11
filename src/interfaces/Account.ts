/**
 * Account interface
 */

import { IUser } from "./User";

export interface IAccount {
    _id: string;
    /** Bank  */
    bank: string;
    /** Type of the account */
    accountType: string;
    /** Number of the account */
    accountNumber: number;
    /** Name of the account's owner  */
    name: string;
    /** RUT of the account's owner */
    rut: string;
    /** Registered user reference */
    user: string | IUser;
}