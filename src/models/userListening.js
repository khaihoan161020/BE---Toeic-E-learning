
const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');
const Schema = mongoose.Schema;
const userListeningSchema = new mongoose.Schema({
    listQuiz : [{
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Listening',
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

module.exports = mongoose.model('UserListening', userListeningSchema);