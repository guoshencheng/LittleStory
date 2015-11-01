var mongoose = require('mongoose');

var storySchema = mongoose.Schema({
    name: String,
    src: String
});

var Story = mongoose.model('Story', storySchema);

module.exports = Story;