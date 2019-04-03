const express = require('express');
const router = express.Router();
const Article = require('../models/article');
const itemPage = 5; //ITEMS PER PAGE

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multiparty = require('multiparty');
const util = require('util');

/* GET */
router.get('/', async function(req, res, next) {
    let articleID = req.query.articleID;
    let page = req.query.page;
    let category = req.query.category;

    //RETURN ALL ARTICLES BY PAGE
    if(articleID==='all'){
        let articles = await Article.find().sort({date:-1}).skip((page-1) * itemPage).limit(itemPage, function(err, items) {
            if (err) throw err;
            return items;
        });

        res.send(articles);
    }

    //RENDER NEW ARTICLE PAGE
    else if(articleID==='newarticle'){
        res.render('new', { title: 'New Article' });
    }

    //RENDER LIST ARTICLES PAGE
    else if(articleID==='listarticles'){
        let total = await Article.countDocuments(function (err, no){
            if(err) throw err;
            return no;
        });

        let pageNo = Math.floor(total/itemPage) + 1;
        res.render('list', { title: 'Articles', total: pageNo });
    }


    //RETURN ARTICLE BY ID
    else if(articleID){
        let article = await Article.findOne({_id: articleID}, function (err, artc){
            if(err) throw err;
            return artc;
        });
        res.send(article)
    }

    //RETURN ALL ARTICLES BY category and page
    else if(category){
        let articles = await Article.find({category: category}).sort({date:-1}).skip((page-1) * itemPage).limit(page * itemPage, function(err, items) {
            if (err) throw err;
            return items;
        });

        res.send(articles);
    }
});

/* POST */
router.post('/', function(request, response) {
    let form = new multiparty.Form();

    form.parse(request, function(err, fields, files) {
        let img_path = files['a-image'][0]['path'];
        let imageID = crypto.randomBytes(15).toString('hex') + '.png';
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
            date: newEntry['a-date'][0],
            views: 0,
            likes: 0,
            dislikes: 0
        });

        // save the article
        newArticle.save(function(err) {
            if (err) throw err;

            console.log('Entry created!');
            response.render('postSaved', { title: 'POST SAVED' });
        });
    });

});

/* PUT */
router.put('/', function(req, res, next) {
    //change article by ID
    res.send('put request');
});

/* DELETE */
router.delete('/', async function(req, res, next) {
    //delete article by ID
    let articleID = req.query.articleID;
    Article.deleteOne({_id: articleID}, function (err, artc){
        if(err) res.send('0');
        res.send('1');
    });
});

module.exports = router;
