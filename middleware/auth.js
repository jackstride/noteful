const jwt = require('jsonwebtoken');

module.exports = async (req,res,next) => {

    const token = await req.cookies.access_token;
    
    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next()   
    }
    catch(err) {
        res.status(401).json({message: "Token no valid"})
    }
}