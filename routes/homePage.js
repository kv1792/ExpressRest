const express = require('express');
const router = express.Router();

router.get('/', (req, resp) => {
    resp.render('index', {
        title: 'Express Application',
        message: 'Hello Express JS World'
    });

});
module.exports = router;