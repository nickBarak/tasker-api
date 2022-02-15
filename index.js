const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();

const {
    PORT,
    DB_USER,
    DB_PASSWORD,
    DB_PORT,
    DB_NAME,
    UI_HOST,
    UI_PORT
} = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors(`${UI_HOST}:${UI_PORT}`));

const pool = new Pool({
    connectionString: `postgresql://${DB_USER}:${DB_PASSWORD}@db:${DB_PORT}/${DB_NAME}`,
    idleTimeoutMillis: 0
});
 
(async () => {
    try {
        var client = await pool.connect();
        client
            ? console.log('Connected to PostgreSQL')
            : console.log('Failed to connect to database');
    } catch (e) { console.log(e) }
    finally { client && client.release() }
})();
exports.pool = pool;
 
app.get('/', (_, res) => res.send('Hello World'));

const indexController = require('./controllers'),
      taskController = require('./controllers/task');
 
app.use('/', indexController);
app.use('/task', taskController);
 
app.listen(PORT, () => console.log('Listening on port ' + PORT));
