/**
 * Created by guoshencheng on 11/2/15.
 */
var jwt = require('jsonwebtoken')
var qiniu = require('qiniu')

var decode = function(token) {
    return jwt.verify(token, 'hello world')
}
var encode = function(obj) {
    return jwt.sign(obj, 'hello world')
}

var checkToken = function(req, res, next) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if(token) {
        var obj = decode(token)

       next()
    } else {
        res.json({error: 'please make a token first'})
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
    res.json({uploadToken: putPolicy.token()})
}

module.exports = {
    decode: decode,
    encode: encode,
    checkToken: checkToken,
    getUploadToken: getUploadToken
}