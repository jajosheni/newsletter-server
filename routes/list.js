const express = require('express');
const router = express.Router();

/* GET Articles page. */
router.get('/', function(req, res, next) {
    res.render('list', { title: 'Articles' });
});

module.exports = router;
