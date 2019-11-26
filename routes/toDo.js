const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ToDo = require("../models/ToDo");
const checkAuth = require('../routes/Authenticate');

router.post('/', checkAuth, (req,res) => {




})



module.exports = router;