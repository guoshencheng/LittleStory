var model = require('../models');
var token = require('./token')

var signIn = function (req, res, next) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    if (username == '' || password == '') {
        res.errorCode = 1211
        next()
    }
    findUser(res, username, function(user) {
        if(!user) {
            res.errorCode = 1212
            next()
        } else {
            if(user.password == password) {
                var currentTime = new Date();
                user.expireIn = currentTime.getTime() + 1000 * 60 * 3
                saveToken(user, res, next)
            } else {
                res.errorCode = 1213
                next()
            }
        }
    })
}

var signUp = function (req, res, next) {
    var username = req.body.username || ''
    var password = req.body.password || ''
    if (username == '' || password == '') {
        res.errorCode = 1211
        next()
    }
    var User = model.User
    findUser(res, username, function(buser) {
        if(buser) {
            res.errorCode = 1214
            next()
        } else {
            var currentTime = new Date()
            var user = new User({
                username: username,
                password: password,
                expireIn: (currentTime.getTime() + 1000 * 60 * 3)
            })
            saveToken(user, res, next)
        }
    })
}

var findUser = function(res, username, callback) {
    var User = model.User
    User.findOne({username: username}, function (error, user) {
        callback(user)
    })
}

var saveToken = function(user, res, next) {
    user.save(function(err, u) {
        u.token = ""
        user.token = token.encode(u);
        user.save(function(err, newU) {
            res.errorCode = 1000
            res.data = newU
            next()
        })
    })
}

module.exports = {
    signIn: signIn,
    signUp: signUp
}