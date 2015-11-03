/**
 * Created by guoshencheng on 11/2/15.
 */
var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    username: String,
    password: String,
    expireIn: Number,
    token: String
});

var User = mongoose.model('User', userSchema);
module.exports = User;