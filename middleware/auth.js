const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {


    //Get Token 

    const token = req.header('x-auth-token');

    //Check if not token

    if(!token) {
        return res.status(401).json({
            message: "No Token"
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded.userId;
        next()
    }

    catch(err) {
        res.status(401).json({message: "Token no valid"})

    }
    





}