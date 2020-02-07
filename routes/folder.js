const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");

const {findAll} = require('../queries/databaseQueries');

const Folder = require("../models/Folder");

router.post("/addFolder", async (req, res) => {
  let { title, id } = req.body;

  const folder = new Folder({
    _id: new mongoose.Types.ObjectId(),
    user_id: id,
    folder_name: title,
  });
  folder.save().then(result => {
    res.status(201).json({ message: "added Folder", folder: result });
  });
});

router.get("/folders/:user_id", async (req, res, next ) => {
  findAll(Folder,req.params)
});


router.delete("/folders/:folderid", (req,res) => {
  let id = req.params.folderid;
  console.log(id);
  

  Folder.findByIdAndRemove(id, (err,res) => {
    if (err) {
      console.log(err)
    }
  })

  res.sendStatus(200);
  
  
});

module.exports = router;
