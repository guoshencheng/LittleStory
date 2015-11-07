/**
 * Created by guoshencheng on 11/2/15.
 */
var jwt = require('jsonwebtoken')
var qiniu = require('qiniu')
var model = require('../models');

var decode = function(token) {
    return jwt.verify(token, 'hello world')
}
var encode = function(obj) {
    return jwt.sign(obj, 'hello world')
}

var checkToken = function(req, res, next) {
    if(req.path == '/login' || req.path == '/register') {
        next()
    } else {
        var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
        if(token) {
            var obj = decode(token)
            var User = model.User
            User.findOne({username: obj.username}, function (error, user) {
                if(user && user.password == obj.password) {
                    var currentTime = new Date()
                    if(user.expireIn < currentTime.getTime()) {
                        res.errorCode = 1111
                    }
                } else {
                    res.errorCode = 1112
                }
                next()
            })
        } else {
            res.errorCode = 1113
            next()
        }
    }
}

var getUploadToken = function(req, res, next) {
    var key = req.body.key
    var bucket
    if (key) {
        bucket = 'guoshencheng:'+ key
    } else {
        bucket = 'guoshencheng'
    }
    var putPolicy = new qiniu.rs.PutPolicy(bucket)
    putPolicy.returnBody = "{" +
    "\"name\":$(fname)," +
    "\"size\":$(fsize)," +
    "\"w\":$(imageInfo.width)," +
    "\"h\":$(imageInfo.height)," +
    "\"hash\":$(etag)}"
    res.errorCode = 1000
    res.data = {uploadToken: putPolicy.token()}
    next()
}

module.exports = {
    decode: decode,
    encode: encode,
    checkToken: checkToken,
    getUploadToken: getUploadToken
}