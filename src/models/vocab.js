const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const vocabSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
   
    example: {
        type: String,
        default: null
    },
    type: {
        type: String,
        required: true,
    },
    means: {type: Array},
            

    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('Vocab', vocabSchema);