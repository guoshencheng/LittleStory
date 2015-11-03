var model = require('../models');
var token = require('./token')

var signIn = function (req, res, next) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    if (username == '' || password == '') {
        res.json({error: 'param is empty'})
    }
    var User = model.User
    findUser(res, username, function() {
        if(user.password == password) {
            var currentTime = new Date();
            user.expireIn = currentTime.getTime() + 1000 * 60 * 10
            saveToken(user, res)
        } else {
            res.json({
                error: 'password is not correct'
            })
        }
    })
}

var signUp = function (req, res, next) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    if (username == '' || password == '') {
        res.json({error: 'param is empty'});
    }
    var User = model.User
    findUser(res, username, function() {
        var currentTime = new Date();
        var user = new User({
            username: username,
            password: password,
            expireIn: (currentTime.getTime() + 1000 * 60 * 10)
        })
        saveToken(user, res);
    })
}

var findUser = function(res, username, callback) {
    User.findOne({username: username}, function (error, user) {
        if(!user) {
            res.json({error: 'has been registered'})
        } else {
            callback()
        }
    })
}

var saveToken = function(user, res) {
    user.save(function(err, u) {
        user.token = token.encode(u);
        user.save(function(err, newU) {
            res.json({
                type: true,
                data: newU
            })
        })
    })
}

module.exports = {
    signIn: signIn,
    signUp: signUp
}