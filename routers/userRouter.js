
console.log("inside user router")

const express = require("express");
//const multer = require("multer");
//const protectRoute = require("../controllers/authController");


const {getUserDetails,createUser, login_signup,login,showUploadPage,uploadFile, uploadToDB, displayData, showCharts} = require("../controllers/userController");

const userRouter = express.Router();
//const upload = multer({dest : 'public/data'})
userRouter.route("/").get(login_signup);
userRouter.route("/home").get(showUploadPage);
userRouter.route("/uploadFileData").post(uploadFile, uploadToDB);
userRouter.route("/login").post(login);
userRouter.route("/createUser").post(createUser);
userRouter.route("/displayData").get(displayData);
userRouter.route("/charts").get(showCharts);


module.exports = userRouter;