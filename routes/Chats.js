const chatsController = require('../controllers/Chats');

const express = require('express');
var router = express.Router();

router.route('/').get(chatsController.returnAllChats);

router.route('/').post(chatsController.createChat);

router.route('/:id').get(chatsController.returnAllmessagesOfId);

module.exports = router;