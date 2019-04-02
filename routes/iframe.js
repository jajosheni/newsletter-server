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

    let newEntry = request.body['new-category'].trim();
    newEntry = newEntry.charAt(0).toUpperCase() + newEntry.slice(1);

    // create a new category
    const newCategory = Category({
        category: newEntry
    });

    Category.find({category: newEntry}, function (err, ctg) {
        if (err) throw err;

        if(!ctg.length){
            // save the category
            newCategory.save(function(err) {
                if (err) throw err;

                console.log('Category created!');
            });
        }
    });
});

module.exports = router;