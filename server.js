const mongoclient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

mongoclient
  .connect(
    "mongodb+srv://ShivanshGupta:india@2006@blogdb.xowev.mongodb.net/test?retryWrites=true&w=majority",
    {
      useUnifiedTopology: true,
    }
  )

  .then((client) => {
    console.log("API DB Connection Succesful");
    const db = client.db("BooksDB");
    const bookCollection = db.collection("AgeBooks");
    app.listen(3000, function (req, res) {
      console.log("Sever has initialised");
    });
    app.get("/", function (req, res) {
      let age = req.query.age;
      bookCollection
        .find()

        .toArray()
        .then((result) => {
          return new Promise((resolve, reject) => {
               if (age){

resolve(result[age - 3].books);
            }
            
 
reject(
   "ERROR: Cannot find age you are looking for! Ages currently between 3-11"
 );
   
             
            
          });
        })
        .catch((error) => {
          console.error(error);
        
        
        });
    });
  });

