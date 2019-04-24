const express = require('express');
const router = express.Router();

const usersC = require('../../controllers/usersController');

// users Route
router
    .get('/', usersC.list_users)
    .post('/', usersC.create_user);

module.exports = router;