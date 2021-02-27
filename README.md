<h1>Requirements:</h1>

<h2>NODE MODULES:</h2>
**MongoDB:** npm install mongodb
**Request:** npm install request
**MD5:** npm install md5
**Cors:** npm install cors
**Express:** npm install express
**Mongoose:** npm install mongoose

<h2>SETUP MONGODB MANUALLY:</h2>
*Run MongoDB on port 27017.*

**1. Create DB "wizkey"** use heroes
**2. Initialize collection "wizkey"** db.heroes.insert({test: "test"})

**Start with:** node app.js


Italiano:

Il progetto richiede alle API di Marvel la lista di eroi con nome e descrizione, lo salva su MongoDB e genera un REST Endpoint  di tipo GET per ottenere i dati in tipo JSON. Per accedere all'endpoint l'utente dovrà usare una chiave pubblica di Marvel, i dati sono già presenti sul database, questo processo funge solo come autenticazione OAuth.

Le API sono disponibili a {SERVER}/heroes/{KEY} per ricevere tutta la lista e {SERVER}/heroes/{KEY}/{ID} per ricevere solo l'eroe con quel'ID.

In caso di chiave pubblica errata l'utente riceverà un errore.

Per provare il progetto si può usare la mia chiave Pubblica nell'URL: f64bb55328851276fe1de69c2d0349df.

Ricordarsi di inserire la chiave pubblica e privata nei field PUBLIC_KEY e PRIVATE_KEY all'interno del file app.js o il progetto non funzionerà.
Disponibile su https://developer.marvel.com


English:

The project contact the Marvel APIs to download the list of heroes with name and description, saves it on MongoDB and then generates a GET REST Endpoint to obtain the data in JSON type. To access the endpoint the user will need to use a Marvel public key, the datas are already present in the database, this process only acts as an OAuth authenticator.

The APIs are available at {SERVER}/heroes/{KEY} to receive the whole list and {SERVER}/heroes/{KEY}/{ID} to receive only the hero with that ID.

If the public_key is invalid the user will receive an error.

To test the project you can use my Public key in the URL: f64bb55328851276fe1de69c2d0349df.

REMEMBER: Insert a Public and a Private Key in the fields PUBLIC_KEY and PRIVATE_KEY in app.js.
You can get your keys at https://developer.marvel.com
