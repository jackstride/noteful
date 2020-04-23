const jwt = require("jsonwebtoken");
const createError = require("http-errors");
const mongoose = require("mongoose");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  console.log("called");
  // Get short lived token and see if it's valid
  // Get token from headers and see if valid
  try {
    if (req.headers.authorization) {
      let refresh_token = req.headers.authorization.split(" ")[1];

      if (refresh_token) {
        jwt.verify(refresh_token, process.env.JWT_KEY, (err, decoded) => {
          if (err) {
            let token = req.cookies.__session;

            if (token) {
              const decoded = jwt.verify(token, process.env.JWT_KEY);

              if (decoded) {

                User.find({_id: decoded._id}, (err, docs) => {
                  if(docs) {
                    if(docs[0].refresh_token === token) {
                      const payload = {
                        email: decoded.email,
                        _id: decoded._id,
                        firstName: decoded.firstName,
                      };
                      jwt.sign(
                        payload,
                        process.env.JWT_KEY,
                        {
                          expiresIn: "10s",
                        },
                        (err, token) => {
                          if (token) {
                            console.log("NEW TOKEN SENT")
                            req.token = token;
                            req.user = payload;
                            return next();
                          } else if (err) {
                            console.log("error");
                            return next(createError(401, "No Token"));
                          }
                          return next(createError(401, "No Token"));
                        }
                      );
                    } else {
                      return next(createError(401, "No Token"));
                    }
                  }
                  if(err) {
                    return next(createError(401, "No Token"));

                  }
                })

                
              } else {
                return next(createError(401, "No Token"));
              }
            } else {
              return next(createError(401, "No token"));
            }
          }
          if (decoded) {
            console.log("CALLLLLED");
            req.user = decoded;
            return next();
          }
        });
      }
    }
  } catch (err) {
    return next(createError(401, "No token"));
  }
};
