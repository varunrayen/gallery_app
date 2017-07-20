const mongoose = require('mongoose');

let imageSchema = new mongoose.Schema({
	imagename: {type: String},
	username: {type: String},
});

var Image = mongoose.model('images', imageSchema);
module.exports = Image;

