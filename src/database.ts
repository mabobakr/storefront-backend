import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { user, password, host, db, test_db, ENV } = process.env;

let current_db = db;

if (ENV == 'test') {
    current_db = test_db;
}
const Client = new Pool({
    host: host,
    database: current_db,
    user: user,
    password: password,
});

export default Client;
