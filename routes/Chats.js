const chatsController = require('../controllers/Chats');

const express = require('express');
var router = express.Router();

router.route('/').get(chatsController.returnAllChats);

router.route('/').post(chatsController.createChat);

router.route('/:id').get(chatsController.returnAllmessagesOfId);

router.route('/:id/Messages').post(chatsController.addNewMessage);

router.route('/:id/Messages').get(chatsController.addNewMessage);

module.exports = router;