const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const transactionSchema = new mongoose.Schema({
basket_num : {
    type : Number,
    //required : [true, "Please tell us your user name"]
    
},
hshd_num : {
    type : Number
    // required: [true, "Please provide your email"],
    // unique : true,
    // lowercase : true,
    // validate: [validator.isEmail, "Please provide a valid email"]
},
purchase_ :{

    type: Date
   // required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
product_num :{

    type: Number
    //required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
spend :{

    type: Number
    // required: [true, "Please confirm your password"],
    // validate:{// works on create and save only
    // validator : function(el){
    //     return el===this.password;
    // },
    // message : "Passwords are not same"
    // },
    // select:false //this ensures that password is not visible in the response when doing a find() or findOne()
},
units :{

    type: Number
    // required: [true, "Please provide a password"],
    // select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
store_r :{

    type: String
   // required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
week_num :{

    type: Number
    //required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},
year :{

    type: String
    //required: [true, "Please provide a password"],
    //select:false //this ensures that password is not visible in the response when doing a find() or findOne()...it is visble after creating a document though in the response of signup
},


})


const Transaction = mongoose.model("Transaction",transactionSchema);

module.exports = Transaction;