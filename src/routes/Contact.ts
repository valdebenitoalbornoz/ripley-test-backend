import express from "express";
import { Route } from "../config/Route";
import { ContactController } from "../controllers/Contact";
import { auth } from '../middlewares/Auth';
// Validator for express: DOCS: https://express-validator.github.io/docs/
import { body } from 'express-validator';
import { validate } from "../middlewares/Validator";

export class ContactRouter extends Route {
    public controller: ContactController = new ContactController();
    constructor(app: express.Application) {
        super(app, 'ContactRoutes');
    }
    
    configureRoutes() {
        const controller: ContactController = new ContactController();
        /** Add contact */
        this.app.post('/contact', [
            auth,
            body([ 'name', 'rut', 'bank', 'accountNumber', 'accountType']).exists(),
            body('email').isEmail().optional(),
            validate
        ], controller.addContact);

        /** Get Contacts of one User */
        this.app.get('/contacts', auth, controller.getContacts);

        return this.app;
    }
}