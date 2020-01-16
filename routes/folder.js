const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { check, validationResult } = require("express-validator");
const auth = require("../middleware/auth");




const Folder = require("../models/Folder");



router.post('/addFolder', (req,res) => {
  console.log("add folder hits")

    let {name} = req.body

    const folder = new Folder({
        _id: new mongoose.Types.ObjectId(),
        user_id: 1,
        folder_name: name,
      });
      folder.save().then(result => {
        res.status(201).json({message: "added Folder"})
      })


      console.log(name)






})






module.exports = router;