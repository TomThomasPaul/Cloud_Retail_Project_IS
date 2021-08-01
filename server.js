const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: `${__dirname}/config.env` });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  }).then(async (conn) => {
    //console.log(conn.connections);
    console.log(`Connection Successful`);
  
    //console.log(await conn.connections[0].db.collection("users_test_data").findOne());
  }).catch((err)=>{
    console.log("error");
     //console.log(err);
     

  });
const app = require(`./app`);

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Server is listening now on port ${port}`);
});