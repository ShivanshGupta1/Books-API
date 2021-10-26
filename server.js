const mongoclient = require("mongodb").MongoClient;
const express = require("express");
const app = express();
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: true }));
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
    app.listen(port, function (req, res) {
      console.log("Sever has initialised");
    });
    app.get("/", function (req, res) {
      let age = req.query.age;
      bookCollection
        .find()
        .toArray()
        .then((result) => {
              res.send(new Promise((resolve, reject) => {
                if (9 >= age-3) {
                  console.log(result[age - 3].books);
                  resolve(result[age-3].books);
                } else {
                  reject(
                    "ERROR: Cannot find age you are looking for! Ages currently between 3-11"
                  );
                }
              })
          )
    })
        }) 
            
        .catch((error) => {
          console.error(error);
        });
    });

