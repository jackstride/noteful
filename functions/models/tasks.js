const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
  user_id: {
    type: String,
    required: true
  },
  isCompleted: {
    type: Boolean,
    required: true
  },
  task_name: {
    type: String,
    required: true
  },
  due_date: {
    type: Date,
    default: () => Date.now() + 7 * 24 * 60 * 60 * 1000,
    required: true
  }
});

const Tasks = mongoose.model("Tasks", TaskSchema);

module.exports = Tasks;
