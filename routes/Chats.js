const chatsController = require('../controllers/Chats');

const express = require('express');
var router = express.Router();

router.route('/').get(chatsController.returnAllChats);

module.exports = router;