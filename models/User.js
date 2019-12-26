const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
    name :{
        type: String,
        required: true
    },
    email :{
        type: String,
        required: true,
        unique: true
    },
    password :{
        type: String,
        required: true
    },
    entries: {
        type: Number,
        default: 0
    },
    joined: {
        type: Date,
        default: Date.now
    } 
});

const User =  mongoose.model('user', UserSchema);

module.exports = User;