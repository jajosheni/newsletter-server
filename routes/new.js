const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multiparty = require('multiparty');
const util = require('util');

const Article = require('../models/article');
const Category = require('../models/category');

/* GET newarticle page. */
router.get('/', function(req, res, next) {
    res.render('new', { title: 'New Article' });
});

router.get('/category', function(req, res, next) {
    Category.find({}, function(err, categories) {
        if (err) throw err;

        // object of all the categories
        res.send(categories);
    });
});

router.post('/', function(request, response) {
    response.render('postSaved', { title: 'POST SAVED' });
    let form = new multiparty.Form();

    form.parse(request, function(err, fields, files) {
        let img_path = files['a-image'][0]['path'];
        let imageID = crypto.randomBytes(15).toString('hex') + '.png'
        fs.rename(img_path, path.join(__dirname, '../public/images/' + imageID), function (err) {
            if (err) {
                if (err)
                    console.log(err);
            }
        });

        let newEntry = fields;

        // create a new article
        const newArticle = Article({
            title: newEntry['a-title'][0].trim(),
            image_url: imageID,
            category: newEntry['a-category'][0],
            content: newEntry['a-text'][0],
            date: newEntry['a-date'][0]
        });

        // save the article
        newArticle.save(function(err) {
            if (err) throw err;

            console.log('Entry created!');
        });
    });

});

module.exports = router;
