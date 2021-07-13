/**
 * Logs configuration class
 * */
import winston, { createLogger } from 'winston';

export default createLogger({
    transports: [
        new winston.transports.Console()
    ]
});