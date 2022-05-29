
const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const userReadingSchema = new mongoose.Schema({
    listQuiz : [{
        questionId: {
            type: String,
            required: true,
        },
        answerId: {
            type: String,
            required: true,
        }
        }]
    ,
    countCorrect: {
        type: Number,
        required: true,
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, schemaOptions);

module.exports = mongoose.model('UserReading', userReadingSchema);