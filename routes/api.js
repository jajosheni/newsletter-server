const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const Category = require('../models/category');

/* API ARTICLES GET REQUESTS */
router.get('/articles', async function(req, res, next) {
    let page = req.query.page;
    let articleID = req.query.articleID;

    if(articleID==='all'){
        let articles = await Article.find({}, function(err, items) {
            if (err) throw err;
            return items;
        });

        res.send(articles);
    }else{
        //find and return articles by category
    }
});

/* API CATEGORIES GET REQUESTS */
router.get('/categories', async function(req, res, next) {
    let categoryID = req.query.category;

    if(categoryID==='all'){
        let ctg = await Category.find({}, function(err, categories) {
            if (err) throw err;
            // object of all the categories
            return categories;
        });
        res.send(ctg);
    }
});

module.exports = router;
