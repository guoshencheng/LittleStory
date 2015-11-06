/**
 * Created by guoshencheng on 11/2/15.
 */
var model = require('../models')

var getAll = function (req, res, next) {
    var Story = model.Story;
    Story.find(function(error, docs) {
        res.errorCode = 1000
        res.data = docs
        next()
    });
}

var getRandom = function(req, res, next) {
    var Story = model.Story;
    Story.find(function(error, docs) {
        var n = docs.length
        if(n > 0) {
            var index = n * Math.random()
            res.errorCode = 1000
            res.data = docs[parseInt(index)]
        } else {
            res.errorCode = 1000
            res.data = {story:{}}
        }
        next()
    });
}

var addStory = function(req, res, next) {
    var name = req.body.name || 'default_name';
    var src = req.body.src;
    var Story = model.Story;
    var story = new Story({
        name: name,
        src: "http://7u2min.com1.z0.glb.clouddn.com/" + src
    })
    story.save(function(err, data) {
        res.errorCode = 1000
        res.data = data
        next()
    })
}

module.exports = {
    getAll: getAll,
    addStory: addStory,
    getRandom: getRandom
}