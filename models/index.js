var mongoose = require('mongoose');
var db = 'mongodb://localhost:27017/story';
mongoose.connect(db, {
    server: {poolSize: 20}
}, function(err) {
    //console.log(err.message);
    //console.error('connect to %s error:', db, err.message);
    //process.exit(1);
});

var Story = require('./story');

exports.Story = Story;