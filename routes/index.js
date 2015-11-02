var express = require('express');
var router = express.Router();
var model = require('../models');
var jwt = require('jsonwebtoken')
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/error', function(req, res, next) {
    res.send(401)
})

router.get('/user/:id', function(req, res, next) {
    res.json({token: ""})
});

router.post('/login', function(req, res, next) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    console.log(req.body)
    if (username == '' || password == '') {
        res.json({error: 'param is empty'})
    }
    var User = model.User
    User.findOne({username: username}, function(err, user) {
        if (err) {
            res.json({error: err})
        }
        if (!user) {
            res.json({error: 'user not registered'})
        } else {
            if(user.password == password) {
                res.json({
                    type: true,
                    data: user
                })
            } else {
                res.json({
                    error: 'password is not correct'
                })
            }
        }
    })
})

router.post('/register', function(req, res, next) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    console.log(req.body)
    if (username == '' || password == '') {
        res.json({error: 'param is empty'});
    }
    var User = model.User
    User.find({username: username}, function (error, doc) {
        if (error) {
            res.json({error: error});
        } else if(doc.length > 0) {
            console.log(doc);
            res.json({error: 'has been registered'})
        } else {
            var user = new User({
                username: username,
                password: password
            })
            user.save(function(err, u) {
                user.token = jwt.sign(u, 'hello world');
                user.save(function(err, newU) {
                    res.json({
                        type: true,
                        data: newU
                    })
                })
            })
        }
    })
})

router.get('/stories', function(req, res, next) {
    var Story = model.Story;
    Story.find(function(error, docs) {
        res.json(docs);
    });
});

router.post('/stories', function(req, res, next) {
    var name = req.body.name || 'default_name';
    var src = req.body.src;
    if(!name) {
        res.json({error: 'has no name param'})
    } else {
        var Story = model.Story;
        var story = new Story({
            name: name,
            src: src
        })
        story.save(function(err, data) {
            if(err) {
                res.json({
                    error: err
                })
            } else {
                res.json(
                    data
                )
            }
        })
    }
})

module.exports = router;


