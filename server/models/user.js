const mongoose = require('mongoose');
const validator = require('validator');

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1,
        validate: {
            validator: validator.isEmail,
            message: '{VALUE} is not a valid email'
        }
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
});

module.exports = { User };