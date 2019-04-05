const express = require('express');
const router = express.Router();

const Category = require('../models/category');

/* GET */
router.get('/', async function(req, res, next) {
    let category = req.query.category;

    //Return all categories
    if(category==='all'){
        let ctg = await Category.find().sort({category:1}).skip(0, function(err, categories) {
            if (err) console.log(err);
            // object of all the categories
            return categories;
        });
        res.send(ctg);
    }

    //Render new category window
    else if(category==='addnewcategory'){
        res.render('category');
    }

    //Return category by name
    else if(category){
        let ctg = await Category.findOne({category: category}, function(err, obj) {
            if (err) console.log(err);
            // return category
            return obj;
        });
        res.send(ctg);
    }
});

/* POST */
router.post('/', function(req, res) {
    let category = req.query.category;
    res.send('Category received');

    //Create Category by name
    let newEntry = category.trim().toLowerCase();
    newEntry = newEntry.charAt(0).toUpperCase() + newEntry.slice(1);

    // create a new category
    const newCategory = Category({
        category: newEntry
    });

    Category.find({category: newEntry}, function (err, ctg) {
        if (err) console.log(err);

        if(!ctg.length){
            // save the category
            newCategory.save(function(err) {
                if (err) console.log(err);

                console.log('Category created!');
            });
        }
    });
});

/* DELETE */
router.delete('/', async function(req, res, next) {
    let category = req.query.category;

    //delete category by name
    Category.deleteOne({category: category}, function (err){
        if(err) res.send('0');
        res.send('1');
    });
});

module.exports = router;