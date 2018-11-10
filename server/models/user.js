let mongoose = require('mongoose');

let User = mongoose.model('User', {
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 1
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