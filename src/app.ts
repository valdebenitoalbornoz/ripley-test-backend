import express from 'express';
import http from 'http';
import cors from 'cors'

import { Route } from './config/Route';
import logger from './config/logger';
import dbConnection from './config/db';
import { UserRouter } from './routes/User';
import { ContactRouter } from './routes/Contact';
import { TransactionRouter } from './routes/Transaction';

const PORT = process.env.PORT || 3000;


export class AppServer {
    private app: express.Application;
    private server: http.Server;
    constructor() {
        this.app = express();
        this.config();
        this.server = http.createServer(this.app);
    }
    /** Initializes app */
    async start() {
        await dbConnection();
        this.server.listen(PORT, () => {
            logger.info('Server creado en puerto ' + PORT);
        });
    }
    
    /** App configuration */
    private config() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: '*',
            methods: [ 'GET', 'POST', 'PUT', 'DELETE', 'OPTIONS' ]
        }));
        
        const routes: Array<Route> = [
            new UserRouter(this.app),
            new ContactRouter(this.app),
            new TransactionRouter(this.app)
        ];
        routes.forEach((route: Route) => {
            logger.info(`Routes configured for ${route.getName()}`);
        });
    }

}
