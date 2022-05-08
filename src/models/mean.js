const mongoose = require('mongoose');
const { schemaOptions } = require('./modelOptions');

const meanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    }
}, schemaOptions);

module.exports = mongoose.model('Mean', meanSchema);