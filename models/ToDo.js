const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ToDoSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
})


const ToDo = mongoose.model('User', ToDoSchema);

module.exports = ToDo;
