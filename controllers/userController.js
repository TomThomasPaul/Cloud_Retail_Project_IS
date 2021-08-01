
const path = require('path');
const User = require("../models/userModel");
const HouseHold = require("../models/houseHoldModel");
const Transaction = require("../models/transactionModel");
const Product = require("../models/productModel");
const multer = require("multer");
const csvtojson = require('csvtojson');
const { models } = require('mongoose');
const {renderData} = require("../public/js/renderData");
const fs = require("fs");

exports.getUserDetails = (req,res,next)=>{

next();

}

exports.createUser = async (req,res,next)=>{
    console.log("in create user");
    // let user = {
    //     name : "Jerry",
    //     email: "tomjerry@gmail.com",
    //     password: "tomjerry",
    //     passwordConfirm: "tomjerry"
    // }
    const doc = await User.create(req.body);
    if(doc){

        req.user = doc;
    }

    console.log(doc);
    res.status(200).json({
        status: "success",
        data: doc

    });
    
    }

    exports.login_signup = async (req,res,next)=>{
        
        //console.log("in login");
        res.sendFile('login_signup.html', { root: './views' })
        
        
        }


        exports.login = async (req,res,next)=>{
            console.log("entered login");
            //console.log("in login");
            //res.sendFile('login.html', { root: './views' })

           //const user = await User.findOne({email : req.body.email});
           try{

            const user = await User.findOne(req.body);
            console.log(user);
            if(user){
                req.user = user;
 
             res.status(200).json({
 
                 status: "success",
                 user
             })
            }else{
                res.status(401).json({

                    message: "Username or password is wrong"
    
                    
                })
            }

           }catch(error){
                

            console.log("catch login error");
            res.status(500).json({

                error

                
            })


           }
          

            

           
            
            
            }

            exports.showUploadPage = async (req,res,next)=>{
        
                console.log("in UPLOAD PAGE");

                    res.sendFile('uploadPage.html', { root: './views' })

                }

               exports.showCharts =async (req,res,next)=>{
        
                console.log("in charts PAGE");

                    res.sendFile('analysis.html', { root: './dataAnalysis' })

                }
               
                
                
                

                exports.uploadToDB = async (req,res,next)=>{
        
                    console.log("IN UPLOAD TO DB");
                    
                    console.log(req.file);


                   const fileName = req.file.filename;
                   let model = undefined;
                   var arrayToInsert = [];
                    csvtojson().fromFile(`./public/data/${fileName}`)
                    .then(async (source) => {


                        // Fetching  all household data from each row
                        if(fileName.toUpperCase().includes("PRODUCT")){
                            model =Product;
                            for (var i = 0; i < source.length; i++) {
                                var oneRow = {
                                    product_num: source[i]["PRODUCT_NUM"],
                                    department: source[i]["DEPARTMENT"],
                                    commodity: source[i]["COMMODITY"],
                                    brand_ty: source[i]["BRAND_TY"],
                                    natural_organic_flag: source[i]["NATURAL_ORGANIC_FLAG"]
                                   
                                };
                                arrayToInsert.push(oneRow);
                            }
                        } else if(fileName.toUpperCase().includes("HOUSEHOLD")){
                            model =HouseHold;
                            for (var i = 0; i < source.length; i++) {
                                var oneRow = {
                                   hshd_num: source[i]["HSHD_NUM"],
                                   l: source[i]["L"],
                                   age_range: source[i]["AGE_RANGE"],
                                   marital: source[i]["MARITAL"],
                                   income_range: source[i]["INCOME_RANGE"],
                                   homeowner: source[i]["HOMEOWNER"],
                                   hshd_composition: source[i]["HSHD_COMPOSITION"],
                                   hh_size: source[i]["HH_SIZE"],
                                   children: source[i]["CHILDREN"]
                                };
                                arrayToInsert.push(oneRow);
                            }


                        } else if(fileName.toUpperCase().includes("TRANSACTION")){
                            model =Transaction;
                            for (var i = 0; i < source.length; i++) {
                                var oneRow = {
                                    basket_num: source[i]["BASKET_NUM"],
                                    hshd_num: source[i]["HSHD_NUM"],
                                    purchase_: source[i]["PURCHASE_"],
                                    product_num: source[i]["PRODUCT_NUM"],
                                    spend: source[i]["SPEND"],
                                    units: source[i]["UNITS"],
                                    store_r: source[i]["STORE_R"],
                                    week_num: source[i]["WEEK_NUM"],
                                    year: source[i]["YEAR"]
                                };
                                arrayToInsert.push(oneRow);
                            }




                        }
                      
                         console.log(arrayToInsert);
                         
                        //delete existing and upload to MONGODB
                        await model.deleteMany({});
                        await model.insertMany(arrayToInsert, (err, result) => {
                          
                            console.log(result);
                            console.log(err);
                            res.status(200).json({
                                status: "success",
                                data: req.file
                                })
                 
                        });

                       
                           //next();

                        })
                    .catch((err)=>{

                          //in case there was an error
                            res.status(404).json({
                                status: "error",
                                errorMessage: err
                            })

                    });

                   

               
                   // next();
                  
               
                };


                exports.displayData = async (req,res,next)=>{
        
                    console.log("in display data");
                    console.log(req.query);
                     //let hashId = 
                    // console.log(hashId);
                    

                    const result = await Transaction.aggregate([
                        
                        { $match : { hshd_num : parseInt(req.query.hashnum? req.query.hashnum : 10)  } },
                        { $lookup:
                           {
                             from: 'households',
                             localField: 'hshd_num',
                             foreignField: 'hshd_num',
                             as: 'household_transactions'
                           }
                         },
                         { $unwind : "$household_transactions" },
                         { $lookup:
                            {
                              from: 'products',
                              localField: 'product_num',
                              foreignField: 'product_num',
                              as: 'product_transactions'
                            }
                          },
                          { $unwind : "$product_transactions" }

                        ])
                        
                    //     const resultSet = result.toArray(function(err, res) {
                    //     if (err) throw err;
                    //     console.log(JSON.stringify(res));
                        
                    //   });
                    //console.log(`./${__dirname}/templates/displayDataTemplate.html`);
                     
                   const template = fs.readFileSync(`./templates/displayDataTemplate.html`, 'utf-8')
                   //console.log(template);
                    let sendHtml =renderData(template,result);
                    console.log(sendHtml);
                    // result.forEach(el => {
                    //     console.log(el.product_transactions);
                    // });
                    // res.writeHead(200, { 'Content-Type': 'text/html' });
                    // res.write(sendHtml);
                    // res.end();
                     
                    res.status(200).json({
                           
                           data: sendHtml
                         })

                    
    
                }

//multer to upload files

const multerStorage = multer.diskStorage({
destination:(req,file,cb) =>{

cb(null, 'public/data');
},

filename: (req, file,cb) =>{
   const ext =file.mimetype.split('/')[1];//extension
   cb(null, `${file.originalname}-${Date.now()}.${ext}`);
}


});


const multerFilter =(req,file,cb)=>{
    console.log(file.mimetype);

    if(file.mimetype.split(".")[1] == ('ms-excel')){
      cb(null, true);
    }else{
    
    cb(()=>{
       console.log("not a csv");

    });
    
    }
    
    };

const upload = multer({storage : multerStorage, fileFilter : multerFilter});

exports.uploadFile = upload.single('uploadedFile');
