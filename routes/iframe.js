const express = require('express');
const router = express.Router();

const Category = require('../models/category');

/* GET iframe page. */
router.get('/', function(req, res, next) {
    res.render('iframe');
});

router.post('/', function(request, response) {
    console.log(request.body);
    response.send('Category received');

    let newEntry = request.body;

    // create a new category
    const newCategory = Category({
        category: newEntry['new-category'].trim()
    });

    // save the category
    newCategory.save(function(err) {
        if (err) throw err;

        console.log('Category created!');
    });
});

module.exports = router;