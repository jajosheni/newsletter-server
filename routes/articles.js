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
    let modify = req.query.modify;

    //RETURN ALL ARTICLES BY PAGE
    if(articleID==='all'){
        let articles = await Article.find().sort({date:-1}).skip((page-1) * itemPage).limit(itemPage, function(err, items) {
            if (err) console.log(err);
            return items;
        });

        res.send(articles);
    }

    //RENDER NEW ARTICLE PAGE
    else if(articleID === 'newarticle'){
        res.render('new', { title: 'New Article' });
    }

    //MODIFY ARTICLE PAGE
    else if(modify === 'true'){
        let article = await Article.findOne({_id: articleID}, function (err, artc){
            if(err) console.log(err);
            return artc;
        });

        res.render('modify', {
            id: article._id,
            title: article.title,
            category: article.category,
            content: article.content,
            date: article.date.toISOString().substring(0,10)
        });
    }

    //RENDER LIST ARTICLES PAGE
    else if(articleID === 'listarticles'){
        let total = await Article.countDocuments(function (err, no){
            if(err) console.log(err);
            return no;
        });

        let pageNo = Math.floor(total/itemPage) + 1;
        res.render('list', { title: 'Articles', total: pageNo });
    }


    //RETURN ARTICLE BY ID
    else if(articleID){
        let article = await Article.findOne({_id: articleID}, function (err, artc){
            if(err) console.log(err);
            return artc;
        });
        res.send(article)
    }

    //RETURN ALL ARTICLES BY category and page
    else if(category){
        let articles = await Article.find({category: category}).sort({date:-1}).skip((page-1) * itemPage).limit(page * itemPage, function(err, items) {
            if (err) console.log(err);
            return items;
        });

        res.send(articles);
    }
});

/* POST */
router.post('/', function(req, res) {
    let form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
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
            if (err) console.log(err);

            console.log('Entry created!');
            res.render('postSaved', { title: 'POST SAVED' });
        });
    });
});

/* PUT */
router.post('/put', async function(req, res, next) {
    let articleID = req.query.articleID;

    let imgname = await Article.findOne({_id: articleID}, function (err, artc){
        if(err) console.log(err);
        return artc;
    });
    imgname = imgname.image_url;

    const img_name = path.join(__dirname, '../public/images/' + imgname);

    let form = new multiparty.Form();

    form.parse(req, function(err, fields, files) {
        let img_path = files['a-image'][0]['path'];
        if(!img_path.includes('.'))
            img_path='';
        else{
            //replace corresponding image
            fs.unlink(img_name, (err) => {
                if (err) {
                    console.error(err);
                }
            });
            fs.rename(img_path, img_name, function (err) {
                if (err) {
                    if (err)
                        console.log(err);
                }
            });
        }

        let newEntry = fields;

        // modify article

        // update the article
        Article.findOneAndUpdate({_id: articleID},
            {   title: newEntry['a-title'][0].trim(),
                image_url: imgname,
                category: newEntry['a-category'][0],
                content: newEntry['a-text'][0],
                date: newEntry['a-date'][0]
            }, function(err) {
            if (err) console.log(err);

            console.log('Entry Updated!');
            res.render('postSaved', { title: 'POST SAVED' });
        });
    });
});

/* DELETE */
router.delete('/', async function(req, res, next) {
    //delete article by ID
    let articleID = req.query.articleID;
    let imgname = await Article.findOne({_id: articleID}, function (err, artc){
        if(err) console.log(err);
        return artc;
    });
    imgname = imgname.image_url;

    Article.deleteOne({_id: articleID}, function (err, artc){
        if(err) res.send('0');
        const imgpath = path.join(__dirname, '../public/images/' + imgname);

        fs.unlink(imgpath, (err) => {
            if (err) {
                console.error(err);
            }
            //delete corresponding image
        });
        res.send('1');
    });
});

module.exports = router;
