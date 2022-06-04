
const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const userReadingSchema = new mongoose.Schema({
    listQuiz : [{
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Reading',
            required: true,
        },
        answerId: {
            type: String || null
        },
        correctPick: {
            type: Boolean || null,
        }
        }]
    ,
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('UserReading', userReadingSchema);