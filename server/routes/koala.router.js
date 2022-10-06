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
koalaRouter.post('/', (req, res) => {
    console.log('req.body is:', req.body);



    const sqlText = `
    INSERT INTO "koalas"
        ("name","age","gender","ready","notes")
    
    VALUES
        ($1,$2,$3,$4,$5)       
    `;

    const sqlParams = [
        req.body.name,
        req.body.age,
        req.body.gender,
        req.body.ready,
        req.body.notes,
    ];

    console.log('in sqlText',sqlText)

    pool.query(sqlText,sqlParams)
        .then((dbRes) =>{
            res.sendStatus(201)
        })
        .catch((err) =>{
            console.log('POST not working',err)
            res.sendStatus(500)
        })
    })

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