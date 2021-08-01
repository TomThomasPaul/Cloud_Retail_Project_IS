const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema({
name : {
    type : String,
    required : [true, "Please tell us your user name"]
},
email : {
    type :String,
    required: [true, "Please provide your email"],
    unique : true,
    lowercase : true,
    validate: [validator.isEmail, "Please provide a valid email"]
},
password :{

    type: String,
    required: [true, "Please provide a password"],
    select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
passwordConfirm :{

    type: String,
    required: [true, "Please confirm your password"],
    validate:{// works on create and save only
    validator : function(el){
        return el===this.password;
    },
    message : "Passwords are not same"
    },
    select:false //this ensures that password is not visible in the response when doing a find() or findOne()
}


})


const User = mongoose.model("User",userSchema);

module.exports = User;