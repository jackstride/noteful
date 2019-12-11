const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const auth = require('../middleware/auth')

require('dotenv').config()

//This was disabled as it redirects to login

// @route GET api/auth
// @Desc Get logged in urser
// @access Private
router.get('/', auth,  async (req,res) => {
        try {
        console.log(req)
         const user =  await User.findById(req.user.userId).select('-password');
        res.send(user);
        }
        catch(err) {
                res.send(401).json({err: "User not found"})
        }
});






module.exports = router;