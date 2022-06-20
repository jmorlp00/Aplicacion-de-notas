const mongoose = require('mongoose');
const  Schema  = mongoose.Schema;

let User = new Schema({
    name: { type: String, required: true},
    surname: {type: String, required: false},
    password: { type: String, required: true}
});

module.exports = mongoose.model('User', User);