const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

let Note = new Schema ({
    title: { type: String, required: true},
    description: {type: String, required: true},
    usuario: {type: String, require: true}
});

module.exports = mongoose.model('Note', Note);