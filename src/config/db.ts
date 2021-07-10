import { connect } from 'mongoose';
const DB_URL = process.env.DB_URL || 'mongodb://localhost:27017/ripley-test';
import logger from './logger';

export default async () => {
    try {
        await connect(DB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
          });
        logger.info('Database connected successfully');
    } catch(error) {
        logger.error(String(error))
    }
}
