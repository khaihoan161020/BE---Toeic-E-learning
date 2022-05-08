const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
 
const userShema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: false
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    },
    dob: {
        type: Date,
        default: null
    },
    email: {
        type: String,
        default: null
    },
    score: {
        type: Number,
        required: true,
        default: 0
    },
    image: {
        type: String,
        default: null
    }
}, schemaOptions);

module.exports = mongoose.model('User', userShema);