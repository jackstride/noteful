const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const ToDo = require("../models/ToDo");
const User = require('../models/User')

const checkAuth = require('../middleware/auth');

router.post('/', checkAuth, async (req,res) => {

    const user = await User.findById(req.user.email).select('-password');
    res.json(user);


})



module.exports = router;