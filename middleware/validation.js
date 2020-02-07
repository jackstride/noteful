const createError = require('http-errors');
const { check, validationResult } = require("express-validator");

const userValidationRules = () => {
  return [
    check("formValues.firstName", "Enter a first name")
      .not()
      .isEmpty(),
    check("formValues.lastName", "Enter a first name")
      .not()
      .isEmpty(),
    check("formValues.password", "Enter a first name")
      .not()
      .isEmpty(),
    check("formValues.email", "There is no email").isEmail()
  ]
}

const validate = (req, res, next) => {

    const errors = validationResult(req);
    console.log(errors)
        if (!errors.isEmpty()) {
          console.log("there ios errorstack")
             next( createError(422, "There appears to be an error registering."));
        }      
        else {
            console.log("no errors")
            next();
        } 
}

module.exports = {
  userValidationRules,
  validate,
}



// User.find({email})
// .exec().then(user => {
//     if(user.length){
//     throw new createError(409,"A user already exists with this email")
//     }
//     else {
//         bycrypt.genSalt(saltRounds,(err,salt) => {
//             if(err) {
//                 throw new createError(500,"Problem with server")
//             }
//         bycrypt.hash(password,salt).then((hash) => {
//             const user = newUser({
//                 _id: new mongoose.Types.ObjectId(),
//                 firstName: firstName,
//                 lastName: lastName,
//                 email: email,
//                 password: hash
//             });

//             user.save().then((result) => {
//                 res.status(201).json({
//                     message: "Register Successful"
//                 })

//             }).catch((err) => {
//                 throw new createError(500,"Problem with server")
//             })

//         }).catch((err) => {
//             throw new createError(500,"Problem with server")
//         })
//         })
//     }
// }).catch((err) => {
//     console.log(err)
// })