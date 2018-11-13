const mongoose = require('mongoose');
const validator = require('validator');
const uniqueValidator = require('mongoose-unique-validator');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        unique: true,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        },
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    }, 
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        required: true,
        trim: true
    }, 
}, {
    timestamps: true
});

UserSchema.plugin(uniqueValidator);
let User = mongoose.model('User', UserSchema);

module.exports = { User };