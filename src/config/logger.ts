/**
 * Logs configuration class
 * */
import winston, { createLogger } from 'winston';

export default createLogger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json(),
        winston.format.printf((info) => {
            return `[${info.level}]: ${info.message}`;
        })
    )
});