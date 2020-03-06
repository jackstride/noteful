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

  folder
    ? res.status(201).json({ message: "Folder Added", folder: result })
    : next(createError(500, "There was an error saving the folder "));
});

router.get("/folders/:user_id", async (req, res, next) => {
  const { user_id } = req.params;

  let folder = await Folder.find({ user_id })
    .sort({ _id: -1 })
    .exec();

  folder
    ? res.status(201).json({ folder })
    : next(createError(500, "There was an error saving the folder "));
});

router.delete("/folders/:folderid", async (req, res, next) => {
  let { folderid } = req.params;

  let result = await Folder.findByIdAndRemove(folderid);

  result
    ? res.sendStatus(200)
    : next(createError(500, "There was an error deleting the folder"));
});

router.put("/folder/update", async (req, res, next) => {
  let { id, name } = req.body;

  let result = await Folder.findByIdAndUpdate(
    { _id: id },
    { folder_name: name }
  );

  result
    ? res.status(200).json({ result })
    : next(createError(500, "There was an error renaming the folder"));
});

module.exports = router;
