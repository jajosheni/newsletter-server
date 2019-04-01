const mongoose = require('mongoose');

// Define schema
const Schema = mongoose.Schema;

//create a schema
const categorySchema = new Schema({
    category: String,
});

// Compile model from schema
const Category = mongoose.model('Category', categorySchema );

module.exports = Category;