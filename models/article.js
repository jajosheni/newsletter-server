const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

//create a schema
const articleSchema = new Schema({
    title: String,
    image_url: String,
    category: String,
    content: String,
    date: { type: Date, default: Date.now() },
    views: Number,
    likes: Number,
    dislikes: Number
});

// Compile model from schema
const Article = mongoose.model('Article', articleSchema );

module.exports = Article;