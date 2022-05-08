const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const userVocabSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    vocabs: {
        type: Schema.Types.ObjectId,
        ref: 'VocabMean',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('UserVocab', userVocabSchema);