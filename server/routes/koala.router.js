const express = require('express');
const koalaRouter = express.Router();
const pool = require('../modules/pool' )

// DB CONNECTION


// GET


// POST


// PUT


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