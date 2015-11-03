/**
 * Created by guoshencheng on 11/2/15.
 */
var model = require('../models')

var getAll = function (req, res, next) {
    var Story = model.Story;
    Story.find(function(error, docs) {
        res.json(docs);
    });
}

var addStory = function(req, res, next) {
    var name = req.body.name || 'default_name';
    var src = req.body.src;
    if(!name) {
        res.json({error: 'has no name param'})
    } else {
        var Story = model.Story;
        var story = new Story({
            name: name,
            src: "http://7u2min.com1.z0.glb.clouddn.com/" + src
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
}

module.exports = {
    getAll: getAll,
    addStory: addStory
}