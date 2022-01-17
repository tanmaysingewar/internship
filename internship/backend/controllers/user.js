const User = require("../models/user");
const jwt = require('jsonwebtoken'); //setting jwt token 


exports.greetsdUser = (req,res) => {
    res.send("Hello user")
}

exports.createUser = (req,res) => {
    console.log(req.body)
    const {firstName , lastName, email, phone, address, password} = req.body;
    if(!firstName || !lastName || !email || !phone||  !address|| !password){
        return res.status(422).json({
            success : false,
            message : "Some fileds are missing",
            err : "Bad Request, server understands the content but it was unable to process the contained instructions."
        })
    }

    const user = new User({
        firstName,
        lastName,
        email,
        phone,
        address,
        password // Hashing will be handled by mongoose in modals --- check modals to see Hashing method !!
    });

    user.save((err , user) =>{
        if(err || !user){
            return res.status(400).json({
                success : false,
                message : 'Not able to save in DB'
            })
        }
        
        return res.json({
           success : true,
           message : "User is created successfully"
        })
    })
}

exports.loginUser = (req,res) => {
        const {email , password } = req.body
        console.log(req.body)

        if(!email, !password){
            return res.status(422).json({
                success : false,
                message : "Bad Request, server understands the content but it was unable to process the contained instructions. "
            })
        }

        User.findOne({email})
        .exec((err,user) => {
            if (err || !user) {
                return res.status(400).json({
                    error: "USER email Does not exist"
                })
            }
            console.log(user.authincate(password))
            if (!user.authincate(password)) {
                return res.status(401).json({
                    error : 'Email and password dosent match'
                })
            }
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60), // token expire in 1 hour
                data: user._id
            }, process.env.TOKEN_SEC);

            return res.json({
                token
            })
        })
}

exports.getUser = (req,res) => {
    // User.findById(req.id)
    const uid = req.uid

    User.findById({_id : uid})
    .select("firstName lastName email phone address")
    .exec((err,user) =>{
        if(err || !user){
            return res.status(400).json({
                success : false,
                message : 'No User in DB'
            })
        }
        return res.json({
            user
        })
    })
}