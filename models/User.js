const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        //match: 
    },
    password: {
        type: String,
    }
})


const User = mongoose.model('User', UserSchema);

module.exports = User;
