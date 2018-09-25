var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Users = new mongoose.Schema({ Users: Array }, { collection: 'users' });

mongoose.Promise = global.Promise;

Users.set('collection', 'users');

var collectionName = 'users';
var M = mongoose.model('Users', Users, collectionName);

module.exports = Users;