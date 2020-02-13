const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
    user_id: {
        type: String,
    },
    folder_id:{
        type: String,
    },
    date: {
        type: Date, default: Date.now,
    },
    body_Data:{
        type: String,
    },
})


const Notes = mongoose.model('Notes', NotesSchema);

module.exports = Notes;
