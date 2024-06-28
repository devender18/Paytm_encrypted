const { Secret } = require("./config");
const jwt = require('jsonwebtoken');

const authMiddleware  = (req,res,next)=>{
    const authtoken = req.headers.authorization;

    if (!authtoken || !authtoken.startsWith('Bearer ')){
        return res.status(403).json({
            "msg" : "Authorization failed !!"
        })
    }else{
        const token = authtoken.split(' ')[1];

        try{
            const decode = jwt.verify(token,Secret);
            req.userId = decode.userId // while generating token it stores id created by mongodb, go to jwt dot io and paste token you will get the payload
            next();

        }catch(error){
            res.status(403).json({
                "msg" : "token verification failed"
            })
        }
    }

    
};

module.exports = {
    authMiddleware
}