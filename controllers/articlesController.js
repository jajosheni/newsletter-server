const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const multiparty = require('multiparty');
const Article = require('../models/article');

const itemPage = 8; //ITEMS PER PAGE

module.exports = {
    //return a page of latest articles
    list_articles : async function(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        let page = req.query.page || 1;

        let articles = await Article.find()
            .sort({date:-1})
            .skip((page-1) * itemPage)
            .limit(itemPage, function(err, items) {
                if (err) console.log(err);
            return items;
        });

        res.send(articles);
    },

    //create new article
    create_article : function(req, res, next) {
        let form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            let img_path = files['a-image'] || '';
            if(img_path) img_path=img_path[0]['path']; //if not empty load image

            let imageID = crypto.randomBytes(15).toString('hex') + '.png';
            if(img_path)
                fs.rename(img_path, path.join(__dirname, '../public/images/' + imageID), function (err) {
                    if (err) console.log(err);
                });

            let newEntry = fields;

            let newObject = {};
            if(newEntry['a-title']) newObject.title = newEntry['a-title'][0].trim();
            if(img_path) newObject.image_url = imageID;
            if(newEntry['a-category']) newObject.category = newEntry['a-category'][0];
            if(newEntry['a-content']) newObject.content = newEntry['a-content'][0];
            if(newEntry['a-date']) newObject.date = newEntry['a-date'][0];

            // create a new article
            const newArticle = Article({
                title: newObject.title || '',
                image_url: newObject.image_url || '',
                category: newObject.category || '',
                content: newObject.content || '',
                date: newObject.date || Date.now(),
                views: [],
                likes: [],
                dislikes: []
            });

            // save the article
            newArticle.save(function(err, artc) {
                if (err) console.log(err);

                console.log('Entry created!');
                res.send(artc);
            });
        });
    },

    //render new article page
    new_article : function(req, res, next) {
        res.render('new', { title: 'New Article' });
    },

    //return article by id
    read_article :  async function(req, res, next) {
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);
        let articleID = req.params.id;

        let article = await Article.findOne({_id: articleID}, function (err, artc){
            if (err) console.log(err);
            return artc;
        });
        res.send(article)
    },

    //update article by id
    update_article : async function(req, res, next) {
        let articleID = req.params.id;

        let article = await Article.findOne({_id: articleID}, function (err, artc){
            if (err) console.log(err);
            return artc;
        });

        let imgname = article.image_url;

        const img_name = path.join(__dirname, '../public/images/' + imgname);

        let form = new multiparty.Form();

        form.parse(req, function(err, fields, files) {
            let img_path = files['a-image'] || '';
            if(img_path) img_path=img_path[0]['path']; //if not empty load image

            if(!img_path.includes('.'))
                img_path='';
            else{
                //replace corresponding image
                fs.unlink(img_name, (err) => {
                    if (err) console.log(err);
                });
                fs.rename(img_path, img_name, function (err) {
                    if (err) console.log(err);
                });
            }

            let newEntry = fields;

            let newObject = {};
            if(newEntry['a-title']) newObject.title = newEntry['a-title'][0];
            newObject.image_url = imgname;
            if(newEntry['a-category']) newObject.category = newEntry['a-category'][0];
            if(newEntry['a-content']) newObject.content = newEntry['a-content'][0];
            if(newEntry['a-date']) newObject.date = newEntry['a-date'][0];

            if(newEntry.user) // if there is a 'user' field in form data
                if(!article.views.includes(newEntry.user[0])){
                    article.views.push(newEntry.user[0]);
                    newObject.views = article.views;
                }

            if(newEntry.user && newEntry.like) // if there is a 'user' and 'like' field in form data
                if(!article.likes.includes(newEntry.user[0])){
                    article.likes.push(newEntry.user[0]);
                    newObject.likes = article.likes;
                    if(article.dislikes.includes(newEntry.user[0])){
                        article.dislikes.splice(
                            article.dislikes.findIndex((elem) => elem === newEntry.user[0]),
                            1
                        );
                        newObject.dislikes = article.dislikes;
                    }
                }

            if(newEntry.user && newEntry.dislike) // if there is a 'dislike' field in form data
                if(!article.dislikes.includes(newEntry.user[0])){
                    article.dislikes.push(newEntry.user[0]);
                    newObject.dislikes = article.dislikes;
                    if(article.likes.includes(newEntry.user[0])){
                        article.likes.splice(
                            article.likes.findIndex((elem) => elem === newEntry.user[0]),
                            1
                        );
                        newObject.likes = article.likes;
                    }
                }

            // update the article
            Article.findOneAndUpdate({_id: articleID},
                newObject , function(err, artc) {
                    if (err) console.log(err);

                    console.log('Entry Updated!');
                    res.send(artc);
                });
        });
    },

    //delete article by id
    delete_article : async function(req, res, next) {
        let articleID = req.params.id;

        let imgname = await Article.findOne({_id: articleID}, function (err, artc){
            if (err) console.log(err);
            return artc;
        });

        if(imgname) imgname = imgname.image_url;

        Article.deleteOne({_id: articleID}, function (err){
            if(err) res.send('0');
            const imgpath = path.join(__dirname, '../public/images/' + imgname);
            if(!imgpath.search(/undefined$/) || !imgpath.search(/null$/))
                fs.unlink(imgpath, (err) => {
                    if (err) console.log(err);
                    //delete corresponding image
                });
            res.send('1');
        });
    },

    //return edit article page
    edit_article : async function(req, res, next) {
        let articleID = req.params.id;

        let article = await Article.findOne({_id: articleID}, function (err, artc){
            if (err) console.log(err);
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
};