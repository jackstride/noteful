const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const Folder = require("../models/Folder");

router.post("/addFolder", async (req, res, next) => {
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

router.get("/folders/:user_id", async (req, res, next) => {
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

router.delete("/folders/:folderid", async (req, res, next) => {
  let { folderid } = req.params;

  let result = await Folder.findByIdAndRemove(folderid);

  if (result) {
    return res.sendStatus(200);
  } else {
    return next(createError(500, "There was an error deleting the folder"));
  }
});

router.put("/folder/update", async (req, res, next) => {
  let { id, name } = req.body;

  let result = await Folder.findByIdAndUpdate(
    { _id: id },
    { folder_name: name }
  );

  if (result) {
    return res.status(200).json({ result });
  } else {
    return next(createError(500, "There was an error renaming the folder"));
  }
});

module.exports = router;
