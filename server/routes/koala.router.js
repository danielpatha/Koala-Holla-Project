const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');


// DB CONNECTION


// GET
koalaRouter.get('/', (req, res) => {
    console.log('in /koalas GET');

    pool.query(`
        SELECT * FROM "koalas"
        ORDER BY "id" ASC;
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

    let queryText = `UPDATE "koalas" SET "ready" = NOT "ready" 
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


koalaRouter.put('/edit/:id', (req, res) => {
    console.log('inside PUT /edit/:id', req.params.id);

    let queryText = `UPDATE "koalas" SET "name" = $1, "age" = $2, "gender" = $3, "notes" = $4 WHERE "id" = $5`;

    let sqlParams = [req.body.name, req.body.age, req.body.gender, req.body.notes, req.params.id];

    pool.query(queryText, sqlParams)
        .then((result) => {
            console.log('koala data has been updated!');
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('error editing koala info', err);
            res.sendStatus(500);
        });
})


// DELETE
//The Remove button will remove a Koala from the table
//This will include an id parameter to see which Koala to delete.
koalaRouter.delete('/:id', (req, res) => {
console.log('in delete with id:', req.params.id);

const sqlText = `DELETE FROM "koalas" WHERE "id" = $1;`;
const sqlPrams = [req.params.id];

pool.query(sqlText, sqlPrams)
.then((dbRes) => {
    console.log('koala successfully deleted!')
    res.sendStatus(200);//Good it worked
})
.catch((err) => {
    console.log('POST err', err);
    res.sendStatus(500);
});

});

module.exports = koalaRouter;