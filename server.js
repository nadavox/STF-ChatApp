const express = require('express');
var app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ChatsApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
app.use(express.static('public/build'));

const users = require('./routes/Users');
app.use('/api/Users', users);

app.listen(5000);
