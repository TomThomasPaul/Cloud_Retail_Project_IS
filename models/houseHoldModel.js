const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const houseHoldSchema = new mongoose.Schema({
hshd_num : {
    type : Number,
    //required : [true, "Please tell us your user name"]
    
},
l : {
    type :String
    // required: [true, "Please provide your email"],
    // unique : true,
    // lowercase : true,
    // validate: [validator.isEmail, "Please provide a valid email"]
},
age_range :{

    type: String
   // required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
marital :{

    type: String
    //required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
income_range :{

    type: String
    // required: [true, "Please confirm your password"],
    // validate:{// works on create and save only
    // validator : function(el){
    //     return el===this.password;
    // },
    // message : "Passwords are not same"
    // },
    // select:false //this ensures that password is not visible in the response when doing a find() or findOne()
},
homeowner :{

    type: String,
    // required: [true, "Please provide a password"],
    // select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
hshd_composition :{

    type: String
   // required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
hh_size :{

    type: String,
    //required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
children :{

    type: String
    //required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},


})


const HouseHold = mongoose.model("HouseHold",houseHoldSchema);

module.exports = HouseHold;