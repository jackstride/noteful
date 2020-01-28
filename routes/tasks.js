const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tasks = require("../models/tasks");


// Add Task
router.post("/addTask", (req, res) => {
  const { title, id } = req.body;

  const task = new Tasks({
    _id: new mongoose.Types.ObjectId(),
    user_id: id,
    isCompleted: false,
    task_name: title
  });

  console.log(task);

  task.save().then(result => {
    res.status(201).json({ message: "added Folder", task: result });
  });
});

// Retrieve all tasks
router.get("/getTasks/:userid", (req, res) => {
  const userid = req.params.userid;

  Tasks.find({ user_id: userid }).sort({_id: -1}).then(doc => {
    res.status(200).json(doc);
  });
});

//Toggle task whether complete or not
router.patch("/editcomplete/:id", (req, res) => {
  const id = req.params.id;

  Tasks.find({ _id: id }).then(doc => {
    let complete = doc[0].isCompleted;

    Tasks.findOneAndUpdate({ _id: id }, { isCompleted: !complete }).then(
      res.status(200).json({isCompleted: !complete})
    );
  });
});


// Delete tasks

router.delete('/deletetask/:id', (req,res) => {
  let id = req.params.id;
  console.log(id);
  
  Tasks.findByIdAndRemove(id, (err,res) => {
    if (err) {
      console.log(err)
    }
  })

  res.sendStatus(200);
})
module.exports = router;
