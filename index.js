const express = require('express');
const app = express();
const cors = require('cors');
const { Pool } = require('pg');
require('dotenv').config();
 
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors('http://localhost:3000'));

const pool = new Pool({
    connectionString: 'postgresql://postgres:malone21@localhost:5432/task_db',
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
 
app.listen(process.env.PORT, () => console.log('Listening on port ' + process.env.PORT));
