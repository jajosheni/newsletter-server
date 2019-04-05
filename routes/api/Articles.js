const express = require('express');
const router = express.Router();

const articlesC = require('../../controllers/articlesController');

// articles Route
router
    .get('/', articlesC.list_articles)
    .post('/', articlesC.create_article)
    .get('/new', articlesC.new_article)
    .get('/:id', articlesC.read_article)
    .put('/:id', articlesC.update_article)
    .delete('/:id', articlesC.delete_article)
    .get('/:id/edit', articlesC.edit_article);

module.exports = router;