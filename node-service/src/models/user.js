const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    }
});

mongoose.Promise = global.Promise;

// authenticate input against database documents
UserSchema.statics.authenticate = (username, password, callback) => {
    User.findOne({username: username})
        .exec( (error, user) => {
            if (error) {
                return callback(error);
            } else if ( !user ) {
                var err = new Error('User not found.');
                err.status = 401;
                return callback(err);
            }
            bcrypt.compare(password, user.password, (error, result) => {
                if (result) {
                    return callback(null, user);
                } else {
                    return callback();
                }
            });
        })
}

// hash password before saving to database
UserSchema.pre('save', function(next) {

    bcrypt.hash(this.password, 10, function(err, hash) {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    }.bind(this));
});
module.exports = mongoose.model('User', UserSchema);