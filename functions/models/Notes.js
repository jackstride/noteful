const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotesSchema = new Schema({
  note_title: {
    type: String,
    default: "Untitled"
  },
  user_id: {
    type: String
  },
  folder_id: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  },
  date_modified: {
    type: Date,
    default: Date.now
  },
  body_Data: {
    type: String,
    default: null
  }
});

const Notes = mongoose.model("Notes", NotesSchema);

module.exports = Notes;
