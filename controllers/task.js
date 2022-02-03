const express = require('express');
const router = express.Router();
const { pool } = require('..');
 
router.post('/', async (req, res) => {
    try {
        var client = await pool.connect();
        await client.query('INSERT INTO task (content) VALUES ($1)', [req.body.content]);
        res.status(201).send("Created task successfully");
    } catch (e) { console.log(e) }
    finally { client && client.release() }
});

router.get('/', async (req, res) => {
    try {
        var client = await pool.connect();
        const { rows } = await client.query('SELECT * FROM task');
        res.status(200).json(rows);
    } catch (e) { console.log(e) }
    finally { client && client.release() }
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id, JSON.stringify(req.body));
    try {
        var client = await pool.connect();
        await client.query('UPDATE task SET content = $1, isComplete = $2 WHERE id = $3', [req.body.content, req.body.isComplete, req.params.id]);
        res.status(200).send("Updated task successfully");
    } catch (e) { console.log(e) }
    finally { client && client.release() }
});

router.delete('/:id', async (req, res) => {
    try {
        var client = await pool.connect();
        const { rows } = await client.query('DELETE FROM task WHERE id = $1', [req.params.id]);
        res.status(200).send("Deleted task successfully");
    } catch (e) { console.log(e) }
    finally { client && client.release() }
});
 
module.exports = router;