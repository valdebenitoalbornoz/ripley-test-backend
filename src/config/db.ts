import { connect } from 'mongoose';
import logger from './logger';
import { DB_URL } from './settings';

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
