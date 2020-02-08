const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createError = require("http-errors")
const Tasks = require("../models/tasks");



// Retrieve all tasks
router.get("/getTasks/:user_id", async (req, res, next) => {
  const {user_id} = req.params;

  let tasks = await Tasks.find({user_id}).sort({_id: -1}).exec();

  tasks 
  ? res.status(201).json({tasks})
  : next(createError(500, "There was an error saving the folder "))
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

  result ? res.status(201).json({ message: "added Folder", task: result })
  : next(createError(500, "There was an error saving the task "))
});

//Toggle task whether complete or not
router.patch("/editcomplete/:_id", async (req, res, next) => {

  const {_id} = req.params;

  const task = await Tasks.find({_id});

  let complete = task[0].isCompleted;

  if (task) {

    let update = await Tasks.findOneAndUpdate({_id},{isCompleted: !complete });

    update ? res.status(200).json({isCompleted: !complete})

    : next(createError(500, "There was an error saving the task "))

  } 
  else {

    next(createError(500, "There was an error saving the task "))

  } 









  // Tasks.find({ _id: id }).then(doc => {
  //   let complete = doc[0].isCompleted;

  //   Tasks.findOneAndUpdate({ _id: id }, { isCompleted: !complete }).then(
  //     res.status(200).json({isCompleted: !complete})
  //   );
  // });
});


// Delete tasks
// Might have to fix res.send the delete file to validate the font end

router.delete('/deletetask/:_id', async (req, res, next) => {

  let {_id} = req.params;

  let success = await Tasks.findByIdAndRemove(_id);

  success
  ? res.sendStatus(200)
  : console.log("fail");

  
})

module.exports = router;
