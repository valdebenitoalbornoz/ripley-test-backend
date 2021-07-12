/** 
 * Modelo de Transacciones
*/

import { Schema, model } from 'mongoose';
import { ITransaction } from '../interfaces/Transaction';

const TransactionSchema: Schema<ITransaction> = new Schema({
    /** Who sends the transaction  */
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  /** Date of the transaction */
  transactionDate: Date,
  /** Receiver of the transaction */
  receiver: { type: Schema.Types.ObjectId, ref: 'Contact' },
  /** Amount of transaction */
  amount: Number
});

export default model<ITransaction>('Transaction', TransactionSchema);