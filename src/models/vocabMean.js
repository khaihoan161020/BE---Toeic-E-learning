const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const vocabMeanSchema = new mongoose.Schema({
    vocab: {
        type: Schema.Types.ObjectId,
        ref: 'Vocab',
        required: true
    },
    mean: {
        type: Schema.Types.ObjectId,
        ref: 'Mean',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('VocabMean', vocabMeanSchema);