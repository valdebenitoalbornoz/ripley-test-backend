import express from "express";
import { Route } from "../config/Route";
import { UserController } from "../controllers/User";

export class UserRouter extends Route {
    public controller: UserController = new UserController();
    constructor(app: express.Application) {
        super(app, 'UserRoutes');
    }
    
    configureRoutes() {
        const controller: UserController = new UserController();
        /** Register */
        this.app.post('/register', controller.register);

        /** Login */
        this.app.post('/login', controller.login);

        return this.app;
    }
}