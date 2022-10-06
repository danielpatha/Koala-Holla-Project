const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET


// POST


// PUT
koalaRouter.put('/:id', (req, res) => {
    console.log( 'in koalaRouter PUT with id of:', req.params.id);

    let queryText = `UPDATE "koalas"
    SET "ready" = TRUE
    WHERE "id" = $1;`;

    pool 
        .query(queryText, [req.params.id])
        .then((result) => {
            console.log('koala is transfer ready!')
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error updating ready status', err);
            res.sendStatus(500);
        });
});


// DELETE

module.exports = koalaRouter;