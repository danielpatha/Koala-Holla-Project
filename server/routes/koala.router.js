const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    console.log('in /koalas GET');

    pool.query(`
        SELECT * FROM "koalas"
    `)
        .then((dbRes) => {
            res.send(dbRes.rows);
        })
        .catch((err) => {
            console.log('in router GET /koalas ERROR', err);
            res.sendStatus(500);
        })
})

// POST


// PUT


// DELETE

module.exports = koalaRouter;