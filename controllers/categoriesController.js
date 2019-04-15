const Category = require('../models/category');
const Article = require('../models/article');

const itemPage = 5; //ITEMS PER PAGE

function prettyFormat(str){
    let newEntry = str.trim().toLowerCase();
    newEntry = newEntry.charAt(0).toUpperCase() + newEntry.slice(1);
    return newEntry;
}

module.exports = {
    //return all categories
    list_categories : async function(req, res, next) {
        let categories = await Category.find().sort({category:1}).skip(0, function(err, ctg) {
            if (err) console.log(err);
            // object of all the categories
            return ctg;
        });
        res.send(categories);
    },

    //return a page of articles by category
    read_category :  async function(req, res, next) {
        let page = req.query.page || 1;
        let category = req.params.category;

        let articles = await Article.find({category: category})
            .sort({date:-1})
            .skip((page-1) * itemPage)
            .limit(itemPage, function(err, items) {
                if (err) console.log(err);
                return items;
            });

        res.send(articles);
    },

    //render new category window
    new_category : async function(req, res, next) {
        res.render('category');
    },

    //create new category
    create_category : async function(req, res, next) {
        let category = req.body.category;
        category = prettyFormat(category);
        // category model
        const newCategory = Category({
            category: category
        });

        Category.find({category: category}, function (err, ctg) {
            if (err) console.log(err);

            //check if category exists
            if(!ctg.length){
                // save the category
                newCategory.save(function(err) {
                    if (err) console.log(err);
                    res.json(ctg);
                    console.log('Category created!');
                });
            }else{
                res.send('Exists!');
            }

        });
    },

    //
    delete_category : function(req, res, next) {
        let category = req.params.category;

        category = prettyFormat(category);
        //delete category by name
        Category.deleteOne({category: category}, function (err, ctg){
            if (err) console.log(err);
            res.json(ctg);
        });
    },
};
