const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Folder = require("../models/Folder");

router.post("/addFolder/", async (req, res, next) => {
  const { title, id } = req.body;

  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
    user_id: id,
    folder_name: title
  });

  result = await folder.save();

  if (folder) {
    return res.status(201).json({ message: "Folder Added", folder: result });
  } else {
    return next(createError(500, "There was an error saving the folder "));
  }
});

router.get("/folders/:user_id/", async (req, res, next) => {
  const { user_id } = req.params;

  let folder = await Folder.find({ user_id })
    .sort({ _id: -1 })
    .exec();

  if (folder) {
    return res.status(201).json({ folder });
  } else {
    return next(createError(500, "There was an error saving the folder "));
  }
});

router.delete("/folders/:folderid/", async (req, res, next) => {
  let { folderid } = req.params;

  let result = await Folder.findByIdAndRemove(folderid);

  if (result) {
    return res.sendStatus(200);
  } else {
    return next(createError(500, "There was an error deleting the folder"));
  }
});

// Update folder roptions
router.put("/folder/update/:_id", async (req, res, next) => {
  let { _id } = req.params;

  let entries = Object.keys(req.body);
  let updates = {};

  for (let i = 0; i < entries.length; i++) {
    updates[entries[i]] = Object.values(req.body)[i];
  }

  let result = await Folder.find({ _id });

  if (result) {
    let update = await Folder.findOneAndUpdate({ _id }, { $set: updates });

    if (update) {
      return res.status(200).json({ update });
    } else {
      return next(createError(500, "There was an error renaming the folder"));
    }
  } else {
    return next(createError(500, "There was an error renaming the folder"));
  }
});

module.exports = router;
