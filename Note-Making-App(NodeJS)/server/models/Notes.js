const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const notesSchema = new Schema({
    user: {
        type: String,
        ref: 'user'
    },
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now(),
    }
});


module.exports = mongoose.model('Note', notesSchema);