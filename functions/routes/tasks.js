const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createError = require("http-errors");
const Tasks = require("../models/tasks");

// Retrieve all tasks
router.get("/getTasks/:user_id", async (req, res, next) => {
  const { user_id } = req.params;

  let tasks = await Tasks.find({ user_id })
    .sort({ _id: -1 })
    .exec();

  if (tasks) {
    return res.status(201).json({ tasks });
  } else {
    return next(createError(500, "There was an error saving the folder "));
  }
});

// Add Task
router.post("/addTask", async (req, res, next) => {
  const { title, id } = req.body;

  const task = new Tasks({
    _id: new mongoose.Types.ObjectId(),
    user_id: id,
    isCompleted: false,
    task_name: title
  });

  const result = await task.save();

  if (result) {
    return res.status(201).json({ message: "added Folder", task: result });
  } else {
    return next(createError(500, "There was an error saving the task "));
  }
});

//Toggle task whether complete or not
router.patch("/editcomplete/:_id", async (req, res, next) => {
  const { _id } = req.params;

  const task = await Tasks.find({ _id });

  let complete = task[0].isCompleted;

  if (task) {
    let update = await Tasks.findOneAndUpdate(
      { _id },
      { isCompleted: !complete }
    );

    if (update) {
      return res.status(200).json({ isCompleted: !complete });
    } else {
      return next(createError(500, "There was an error saving the task "));
    }
  } else {
    return next(createError(500, "There was an error saving the task "));
  }
});

// Delete tasks
// Might have to fix res.send the delete file to validate the font end

router.delete("/deletetask/:_id", async (req, res, next) => {
  let { _id } = req.params;

  let success = await Tasks.findByIdAndRemove(_id);

  if (success) {
    return res.sendStatus(200);
  } else {
    return next(createError(500, "There was an error deleting the task "));
  }
});

// Update task
router.put("/task/update", async (req, res, next) => {
  let { _id } = req.body;
  let entries = Object.keys(req.body);
  let updates = {};

  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }

  if (updates.due_date) {
    updates.due_date = Date.now() + updates.due_date * 24 * 60 * 60 * 1000;
  }
  let task = await Tasks.find({ _id });

  if (task) {
    let result = await Tasks.findOneAndUpdate(
      { _id },
      { $set: updates },
      // Get new
      { new: true }
    );
    if (result) {
      console.log(result);
      return res.status(200).json({ result });
    } else {
      return next(createError(500, "There was an error saving the note "));
    }
  } else {
    return next(createError(500, "There was an issue"));
  }
});

module.exports = router;
