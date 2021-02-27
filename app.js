//Marvel GRABBER

//API
const PUBLIC_KEY = "PUBLIC_KEY HERE"; 
const PRIVATE_KEY = "PRIVATE_KEY HERE"; 



//MD5 TS (TimeStamp) + PrivateKey + PublickKey
var md5 = require('md5');

var TIMESTAMP = Date.now();
var hash = md5(`${TIMESTAMP}${PRIVATE_KEY}${PUBLIC_KEY}`);

const request = require('request');



//MongoDB

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("heroes");

    //Drop Existing DATA
    dbo.dropDatabase("heroes");
    console.log("The DB is now empty.");

    request(`https://gateway.marvel.com:443/v1/public/characters?ts=${TIMESTAMP}&apikey=${PUBLIC_KEY}&hash=${hash}`, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }

    var i = 0;
        for (i = 0; i < body.data.results.length; i++) {    
            if (body.data.results[i].description == "") {
              var myobj = { name: body.data.results[i].name, id: i };  
            }
            else {
              var myobj = { name: body.data.results[i].name, description:body.data.results[i].description, id: i };  
            }
            console.log(`1 document inserted (${body.data.results[i].name}).`);
            dbo.collection("heroes").insertOne(myobj, function(err, res) {
              if (err) throw err;
              db.close();
            });
        } 

    });
}); 



//HTTP Server

const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send(`<b>Heroes List:</b> http://127.0.0.1:${port}/heroes/{KEY} <br><b>Find Hero by ID:</b> http://127.0.0.1:${port}/heroes/{KEY}/{ID} <br><br><b>The KEY is Released by Marvel.com</b> You have to use the Public-Key as KEY. Get one on https://developer.marvel.com`);
  console.log(`API Called (/).`);
});



//Mongoose

var Mongoose = require('mongoose');

var mongoDB = 'mongodb://127.0.0.1/heroes';
Mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

var db = Mongoose.connection;

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
  console.log(`API Called (/).`);
});

app.get("/heroes/:pa", async (request, response) => {
  
  const requestapi = require('request');

  //OAuth, request to Marvel a API-Key check and if valid shows the contents.
  requestapi(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${request.params.pa}&hash=1`, { json: true }, async (err, res, body) => {
    if (err) { return console.log(err); }
    try {
      var resultapi = body.message;

      try {
        if(resultapi == "The passed API key is invalid.") {
           console.log("API Called (/heroes). Invalid API Key.");
           response.send("Invalid Public API Key. <br>Format: /heroes/{KEY}. <br>Get a Key on Marvel.com");  
         }
        else {
          var result = await HeroesModel.find().exec();
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
  
  const requestapi = require('request');

  //OAuth, request to Marvel a API-Key check and if valid shows the contents.
  requestapi(`https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=${request.params.pa}&hash=1`, { json: true }, async (err, res, body) => {
    if (err) { return console.log(err); }
    try {
      var resultapi = body.message;

      try {
        if(resultapi == "The passed API key is invalid.") {
           console.log(`API Called (/heroes/${request.params.id}). Invalid API Key.`);
           response.send("Invalid Public API Key. <br>Format: /heroes/{KEY}/{ID}. <br>Get a Key on Marvel.com");
         }
        else {
          var hero = await HeroesModel.find({id : request.params.id}).exec();
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
