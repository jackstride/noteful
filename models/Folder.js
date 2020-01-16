const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FolderSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})


const ToDo = mongoose.model('Folder', FolderSchema);

module.exports = ToDo;
