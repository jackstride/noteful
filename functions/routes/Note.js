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
  const { user_id, folder_id, body_data } = req.body;

  const note = new Notes({
    _id: new mongoose.Types.ObjectId(),
    user_id,
    folder_id
  });
  const result = await note.save();

  if (result) {
    return res.status(201).json({ message: "Note added", note: result });
  } else {
    return next(createError(500, "Error with creating Note"));
  }
});

// Working
// Delete a note
router.delete("/note/delete/:_id", async (req, res, next) => {
  const { _id } = req.params;

  let success = await Notes.findByIdAndRemove(_id);

  if (success) {
    res.sendStatus(200);
  } else {
    return next(createError(500, "There was an error deleting the task "));
  }
});

router.delete("/note/delete/all/:folder_id", async (req, res, next) => {
  let { folder_id } = req.params;

  let success = await Notes.deleteMany({ folder_id });

  if (success) {
    return res.sendStatus(200);
  } else {
    return next(createError(500, "There was an error deleting the task "));
  }
});

// Working
//Get all notes
router.get("/note/all/:folder_id", async (req, res, next) => {
  let { folder_id } = req.params;

  let notes = await Notes.find({ folder_id })
    .sort({ _id: -1 })
    .exec();

  //FOlder id may be find by user_id
  if (!notes.length) {
    notes = await Notes.find({ user_id: folder_id })
      .sort({ _id: -1 })
      .exec();
  }

  if (notes) {
    return res.status(201).json({ notes });
  } else {
    return next(createError(500, "There was an error saving the folder "));
  }
});

// Edit Existing Note
//https://dev.to/rubiin/mongoose-dynamic-update-hack-21ad - filter out what is empty
router.patch("/note/edit/:_id", async (req, res, next) => {
  console.log("hit");
  let { _id } = req.params;
  let entries = Object.keys(req.body);
  let updates = {};

  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }

  let note = await Notes.find({ _id });

  if (note) {
    let update = await Notes.findOneAndUpdate({ _id }, { $set: updates });

    if (update) {
      return res.status(200).json({ message: "done", note });
    } else {
      return next(createError(500, "There was an error saving the note "));
    }
  } else {
    return next(createError(500, "There was an error saving the note "));
  }
});

// Get note by id

router.get("/note/:_id", async (req, res, next) => {
  let { _id } = req.params;

  let note = await Notes.findById({ _id });

  if (note) {
    return res.status(200).json({ note });
  } else {
    return next(createError(500, "There was an error saving the note "));
  }
});

module.exports = router;
