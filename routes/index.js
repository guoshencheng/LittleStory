var express = require('express');
var router = express.Router();
var model = require('../models');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/stories', function(req, res, next) {
    var Story = model.Story;
    Story.find(function(error, docs) {
        res.json({story:docs});
    });
});

router.post('/stories', function(req, res, next) {
    var name = req.param('name');
    if(!name) {
        res.json({error: 'has no name param'})
    } else {
        var Story = model.Story;
        var story = new Story({
            name: name,
            src: "www.baidu.com"
        });
        story.save();
        res.json({
            name: name,
            src: "www.baidu.com"
        });
    }
});

module.exports = router;
