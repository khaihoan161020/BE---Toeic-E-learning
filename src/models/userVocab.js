
const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const userVocabSchema = new mongoose.Schema({
    vocabId: {
        type: Schema.Types.ObjectId,
        ref: 'Vocab',
        required: true,
    },
    mode: {
        type: Number || null
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('UserVocab', userVocabSchema);