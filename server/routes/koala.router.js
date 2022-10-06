const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool');

// DB CONNECTION


// GET


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


// DELETE

module.exports = koalaRouter;