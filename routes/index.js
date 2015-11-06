var express = require('express');
var router = express.Router();
var users = require('./users')
var stories = require('./stories')
var token = require('./token')

/* GET home page. */
router.get('/', token.checkToken,function(req, res, next) {
    res.render('index', { title: 'Express' });
});
router.get('/error', function(req, res, next) {
    res.send(401)
})
router.get('/user/:id', function(req, res, next) {
    res.json({token: ""})
});
router.post('/uploadToken', token.getUploadToken)
router.post('/login', users.signIn)
router.post('/register',users.signUp)
router.get('/stories', stories.getRandom)
router.post('/stories', stories.addStory)
router.get('/allStories', stories.getAll)

module.exports = router;


