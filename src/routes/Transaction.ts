import express from "express";
import { Route } from "../config/Route";
import { TransactionController } from "../controllers/Transaction";
import { auth } from '../middlewares/Auth';
// Validator for express: DOCS: https://express-validator.github.io/docs/
import { body } from 'express-validator';
import { validate } from "../middlewares/Validator";

export class TransactionRouter extends Route {
    public controller: TransactionController = new TransactionController();
    constructor(app: express.Application) {
        super(app, 'TransactionRoutes');
    }
    
    configureRoutes() {
        const controller: TransactionController = new TransactionController();
        /** Add Transaction */
        this.app.post('/transaction', [
            auth,
            body([ '' ]).exists(),
            body('email').isEmail().optional(),
            validate
        ], controller.addTransaction);

        /** Get Contacts of one User */
        this.app.get('/transactions',
        auth,
        controller.getTransactions);

        return this.app;
    }
}