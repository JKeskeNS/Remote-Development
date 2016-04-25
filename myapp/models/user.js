// myapp/models/user.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
	userName: String,
	server: String,
	name: String
});

module.exports = mongoose.model('User', UserSchema);
