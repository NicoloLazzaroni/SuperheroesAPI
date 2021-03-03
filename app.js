//Marvel GRABBER
//Project by Nicolò Lazzaroni

//Requirements
const Mongoose = require('mongoose');
const md5 = require('md5');
const requestapi = require('request');
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;

//API
const PUBLIC_KEY = "PUBLIC_KEY HERE"; 
const PRIVATE_KEY = "PRIVATE_KEY HERE"; 



//MD5 TS (TimeStamp) + PrivateKey + PublickKey
let TIMESTAMP = Date.now();
let hash = md5(`${TIMESTAMP}${PRIVATE_KEY}${PUBLIC_KEY}`);



//HTTP Server
const app = express();
const port = 3000;

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send(`<b>Heroes List:</b> http://127.0.0.1:${port}/heroes/{KEY} <br><b>Find Hero by ID:</b> http://127.0.0.1:${port}/heroes/{KEY}/{ID} <br><br><b>The KEY is Released by Marvel.com</b> You have to use the Public-Key as KEY. Get one on https://developer.marvel.com`);
  console.log(`API Called (/).`);
});



//MongoDB
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  let dbo = db.db("heroes");

    //Drop Existing DATA
    dbo.dropDatabase("heroes");
    console.log("The DB is now empty.");

    requestapi(`https://gateway.marvel.com:443/v1/public/characters?ts=${TIMESTAMP}&apikey=${PUBLIC_KEY}&hash=${hash}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    let myobj = [];

    let i = 0;
        for (i = 0; i < body.data.results.length; i++) {    
            if (body.data.results[i].description == "") {
              myobj.push({name: body.data.results[i].name, id: i });
            }
            else {
              myobj.push({name: body.data.results[i].name, id: i });
            }
        } 

        dbo.collection("heroes").insertMany(myobj, function(err, res) {
          if (err) throw err;
          db.close();
        });

    });
}); 

let mongoDB = 'mongodb://127.0.0.1/heroes';
Mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

let db = Mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));

//REST Endpoint

const HeroesModel = Mongoose.model("heroes", {
  name: String,
  description: String,
  id: Number
}, 'heroes' //Collection name
);

app.get("/heroes", function (req, res) {
  res.send("Invalid Public API Key. <br>Format: /heroes/{KEY}. <br>Get a Key on Marvel.com");
  console.log(`API Called (/heroes). Invalid API Key.`);
});

app.get("/heroes/:pa", async (request, response) => {
  

  //OAuth, request to Marvel a API-Key check and if valid shows the contents.
  requestapi(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${request.params.pa}&hash=1`, { json: true }, async (err, res, body) => {
    if (err) { return console.log(err); }
    try {
      let resultapi = body.message;

      try {
        if(resultapi == "The passed API key is invalid.") {
           console.log("API Called (/heroes). Invalid API Key.");
           response.send("Invalid Public API Key. <br>Format: /heroes/{KEY}. <br>Get a Key on Marvel.com");  
         }
        else {
          let result = await HeroesModel.find().exec();
          response.send(result);
          console.log("API Called (/heroes).");
         }
     } catch (error) {
          response.status(500).send(error);
     }

  } catch (error) {
      response.status(500).send(error);
  }
  });

});

app.get("/heroes/:pa/:id", async (request, response) => {
  

  //OAuth, request to Marvel a API-Key check and if valid shows the contents.
  requestapi(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${request.params.pa}&hash=1`, { json: true }, async (err, res, body) => {
    if (err) { return console.log(err); }
    try {
      let resultapi = body.message;

      try {
        if(resultapi == "The passed API key is invalid.") {
           console.log(`API Called (/heroes/${request.params.id}). Invalid API Key.`);
           response.send("Invalid Public API Key. <br>Format: /heroes/{KEY}/{ID}. <br>Get a Key on Marvel.com");
         }
        else {
          let hero = await HeroesModel.find({id : request.params.id}).exec();
          response.send(hero);
          console.log(`API Called (/heroes/${request.params.id}).`);
         }
     } catch (error) {
          response.status(500).send(error);
     }

  } catch (error) {
      response.status(500).send(error);
  }
  });

});

app.listen(port, () =>
  console.log(`Example app listening on port ${port}!`),
);
