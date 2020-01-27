const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Tasks = require("../models/tasks");

router.post("/addTask", (req, res) => {
  const task = new Tasks({
    _id: new mongoose.Types.ObjectId(),
    user_id: "5de1207c17910f161383256d",
    isCompleted: false,
    task_name: "Walk the dog"
  });

  task.save().then(result => {
    res.status(201).json({ message: "added Folder", folder: result });
  });
});

router.get("/getTasks/:userid", (req, res) => {
  const userid = req.params.userid;

  Tasks.find({ user_id: userid }).then(doc => {
    res.status(200).json(doc);
  });
});

router.patch("/editcomplete/:id", (req, res) => {
  const id = req.params.id;

  Tasks.find({ _id: id }).then(doc => {
    let complete = doc[0].isCompleted;

    console.log(complete)

    Tasks.findOneAndUpdate({ _id: id }, { isCompleted: !complete }).then(
      res.status(200)
    );
  });
});

module.exports = router;
