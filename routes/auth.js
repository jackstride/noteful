const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require("../models/User");
const auth = require('../middleware/auth')

require('dotenv').config()



// @route GET api/auth
// @Desc Get logged in urser
// @access Private
router.get('/',auth, async (req,res) => {
        console.log("working");
        const user =  await User.findById(req.user.userId).select('-password');
        console.log(user);
        
        res.send(user);

});





module.exports = router;