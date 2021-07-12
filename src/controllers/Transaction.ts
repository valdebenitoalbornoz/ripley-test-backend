import { Request, Response } from 'express';
import { Types } from 'mongoose';
// Model
import Transaction from '../models/Transaction';

export class TransactionController {
  /** Add a new transaction */
  public addTransaction = async (req: Request, res: Response) => {
    try {
      const { receiver, amount } = req.body;
      const sender = res.locals._user?._id;
      const transaction = await Transaction.create({
        transactionDate: new Date(),
        receiver,
        amount,
        sender
      });

      res.status(200).send({
        done: true,
        message: 'Transacción realizada correctamente',
        transaction
      });
    } catch (error) {
      res.status(500).send({ error });
    }
  };

  /** Get Transactions for user */
  public getTransactions = async (req: Request, res: Response) => {
    try {
      const sender = res.locals._user?._id;
      const { query } = req;
      const { receiver } = query;
      const page = Number(query.page) || 1;
      const limit = Number(query.limit) || 50;
      const transactions = await Transaction.aggregate([
        {
          $match: { sender: Types.ObjectId(sender) }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'sender',
            foreignField: '_id',
            as: 'sender'
          }
        },
        {
          $unwind: '$sender'
        },
        {
          $lookup: {
            from: 'contacts',
            localField: 'receiver',
            foreignField: '_id',
            as: 'receiver'
          }
        },
        {
          $unwind: '$receiver'
        },
        {
          $match: {
            $and: [
              receiver
                ? {
                    'receiver.name': {
                      $regex: receiver,
                      $options: 'i'
                    }
                  }
                : {}
            ]
          }
        },
        {
          $skip: (page - 1) * limit
        },
        {
          $limit: limit
        },
        {
            $sort: { transactionDate: -1 }
        },
        {
            $project: {
                'sender.password': 0
            }
        }
      ]);
      res.status(200).send({ done: true, transactions });
    } catch (error) {
      res.status(500).send({ error });
    }
  };
}
