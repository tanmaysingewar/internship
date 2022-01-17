const mongoose = require('mongoose');
const {Schema} = mongoose
const { v4: uuidv4 } = require('uuid');
const crypto = require('crypto');

const userSchema = new Schema({
    firstName :{
        type : String,
        required : true,
        trim : true
    },
    lastName :{
        type : String,
        required : true,
        trim : true
    },
    email :{
        type : String,
        required : true,
        trim : true
    },
    phone :{
        type : Number,
        required : true,
        trim : true
    },
    address:{
        type : String,
        required : true,
        trim : true
    },
    ency_password : {
        type : String,
        required : true
    },
    salt : {
        type: String,
        required :true,
        unique : true
    }
})

userSchema.virtual('password')
    .set(function(password){
        this._password = password
        this.salt = uuidv4()
        this.ency_password = this.securePassward(password)
    })
    .get(function(){
        return this._password
    })

userSchema.methods = {
    authincate: function (plainPassowed){
        return this.securePassward(plainPassowed) == this.ency_password
    },
    securePassward : function (password){
        if(!password){
            return ''
        }
        try{
            return crypto.createHash(process.env.PASSWORD_SHA, this.salt)
            .update(password)
            .digest(process.env.PASSWORD_DIGEST)
        }catch(e){
            return ''
        }
    }
}

module.exports = mongoose.model('User',userSchema)