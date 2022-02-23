const express = require('express');
const logger = require('morgan');
const bodyParser = require("body-parser");
const history = require('connect-history-api-fallback');
const staticPath = __dirname + '/public/';
const likes = require('./http/controllers/likes');
const posts = require('./http/controllers/posts')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(history())
app.use(express.static(staticPath));

app.get('/get-post', (req, res) => {
    posts.getAllPost(req, res)
})

app.post('/set-like', (req, res) => {
    likes.setLike(req, res)
})

app.post('/delete-like', (req, res) => {
    likes.dislike(req, res)
})

app.get('/post/:id', (req, res) => {
    likes.checkLike(req, res)
})

module.exports = app;
