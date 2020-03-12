const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    twitter_id: {
        type: String,
        default: null,
    },
    google_id: {
        type: String,
        default: null,
    }
})


const User = mongoose.model('User', UserSchema);

module.exports = User;
