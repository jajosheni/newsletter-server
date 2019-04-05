const express = require('express');
const router = express.Router();

const categoriesC = require('../../controllers/categoriesController');

// categories Route
router
    .get('/', categoriesC.list_categories)
    .post('/', categoriesC.create_category)
    .get('/new', categoriesC.new_category)
    .get('/:category', categoriesC.read_category)
    .delete('/:category', categoriesC.delete_category);

module.exports = router;