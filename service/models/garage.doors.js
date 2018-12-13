var mongoose = require('mongoose');
var GarageDoors = new mongoose.Schema({
    garageDoors: {
        type: Array,
        door: {
            type: Object,
            name: {
                type: String,
            },
            status: {
                type: Boolean
            }
        }
    }
});

mongoose.Promise = global.Promise;

GarageDoors.set('collection', 'garageDoors');

var collectionName = 'garageDoors';

var M = mongoose.model('GarageDoors', GarageDoors, collectionName);

module.exports = GarageDoors;