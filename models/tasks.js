const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    user_id: {
        type: String,
        required: true,
    },
    isCompleted: {
        type: Boolean,
        required: true,
    },
    task_name: {
        type: String,
        required: true,
    },
})


const Tasks = mongoose.model('Tasks', TaskSchema);

module.exports = Tasks;
