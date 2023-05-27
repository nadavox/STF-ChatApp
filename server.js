const express = require('express');
var app = express();

// the libary that give me to use env files.
const CustomEnv = require('custom-env');

//define the env varibles:
CustomEnv.env(process.env.NODE_ENV, './config');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());



const cors = require('cors');
app.use(cors());

const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//print the env variebles of our program
console.log(process.env)

app.use(express.static('public/build'));

const users = require('./routes/Users');
app.use('/api/Users', users);

const tokens = require('./routes/Tokens');
app.use('/api/Tokens', tokens);

const chats = require('./routes/Chats');
app.use('/api/Chats', chats);

app.listen(process.env.PORT);