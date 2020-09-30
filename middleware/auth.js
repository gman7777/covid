const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next){
    //get token from header
    const token = req.header('auth-token');

    // check if not token
    if(!token){
        return res.status(401).json({msg: 'Access Denied'});
    }

    //verify token
    try{
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    }catch(err){
        res.status(401).json({msg:'token is not valid'});
    }
};