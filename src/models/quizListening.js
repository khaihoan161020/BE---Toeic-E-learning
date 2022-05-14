const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const listeningSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true,
    },
    audio: {
        type: String,
        required: true,
    },
    data: {
        answer: {
            type: String,
            required: true,
        },
        isCorrect: {
            type: Boolean,
            required: true,
        },
        type: Array,
        default: null
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('Listening', listeningSchema);