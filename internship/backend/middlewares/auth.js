const jwt = require('jsonwebtoken'); //setting jwt token 

exports.checkToken = (req,res,next) => {
    const headerToken = req.headers.authorization.split(" ")
    if(!headerToken[1]){
        return res.status(401).json({
            success : false,
            error : 'unAuthorized request'
        })
    }else{
        const token =  headerToken[1]
        var decoded = jwt.verify(token, process.env.TOKEN_SEC)
        console.log(decoded)
        req.uid = decoded.data
        next()
    }
}