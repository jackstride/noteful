const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  folder_name: {
    type: String,
    required: true
  },
  folder_color: {
    type: String,
    default: "#DCDCDC"
  }
});

const ToDo = mongoose.model("Folder", FolderSchema);

module.exports = ToDo;
