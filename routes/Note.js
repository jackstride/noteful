const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const createError = require("http-errors");
const { userValidationRules, validate } = require("../middleware/validation");
const Notes = require("../models/Notes");

// Working
// Add a note
router.post("/note/add", async (req, res, next) => {
  //Date feault to time of request
  const { user_id, folder_id, date, body_data } = req.body;
  console.log(req.body);

  const note = new Notes({
    _id: new mongoose.Types.ObjectId(),
    user_id: user_id,
    folder_id: folder_id,
    body_Data: body_data
  });
  const result = await note.save();

  result
    ? res.status(201).json({ message: "Note added", note: result })
    : next(createError(500, "Error with creating Note"));
});

// Working
// Delete a note
router.delete("/note/delete/:_id", async (req, res, next) => {
  const { _id } = req.params;

  let success = await Notes.findByIdAndRemove(_id);

  success
    ? res.sendStatus(200)
    : next(createError(500, "There was an error deleting the task "));
});

// Working
//Get all notes
router.get("/note/all/:folder_id", async (req, res, next) => {
  try {
    let { folder_id } = req.params;
    console.log(folder_id);

    let notes = await Notes.find({ folder_id })
      .sort({ _id: -1 })
      .exec();
    console.log(notes);

    notes
      ? res.status(201).json({ notes })
      : next(createError(500, "There was an error saving the folder "));
  } catch {
    next(createError(500, "There was an error saving the folder "));
  }
});

module.exports = router;
