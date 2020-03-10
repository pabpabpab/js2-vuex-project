const express = require('express');
const fs = require('fs');
const router = express.Router();

router.get('/', (req, res) => {
    fs.readFile('./server/db/featured-products.json', 'utf-8', (err, data) => {
        if (err) {
            res.sendStatus(404, JSON.stringify({result: 0, text: err}));
        } else {
            res.send(data);
        }
    });
});


module.exports = router;
