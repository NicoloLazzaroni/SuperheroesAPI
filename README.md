<h1>Requirements:</h1>

<h2>NODE MODULES:</h2>
<b>MongoDB:</b> npm install mongodb<br>
<b>Request:</b> npm install request<br>
<b>MD5:</b> npm install md5<br>
<b>Cors:</b> npm install cors<br>
<b>Express:</b> npm install express<br>
<b>Mongoose:</b> npm install mongoose<br>

<h2>SETUP MONGODB MANUALLY: (Not necessary)</h2>
*Run MongoDB on port 27017.*

**1. Create DB "heroes"** use heroes

**2. Initialize collection "heroes"** db.heroes.insert({test: "test"})

**Start with:** node app.js


<h1>Italiano:</h1>

Il progetto richiede alle API di Marvel la lista di eroi con nome e descrizione, lo salva su MongoDB e genera un REST Endpoint  di tipo GET per ottenere i dati in tipo JSON. Per accedere all'endpoint l'utente dovrà usare una chiave pubblica di Marvel, i dati sono già presenti sul database, questo processo funge solo come autenticazione OAuth.

Le API sono disponibili a {SERVER}/heroes/{KEY} per ricevere tutta la lista e {SERVER}/heroes/{KEY}/{ID} per ricevere solo l'eroe con quel'ID.

In caso di chiave pubblica errata l'utente riceverà un errore.

Per provare il progetto si può usare la mia chiave Pubblica nell'URL: f64bb55328851276fe1de69c2d0349df.

Ricordarsi di inserire la chiave pubblica e privata nei field PUBLIC_KEY e PRIVATE_KEY all'interno del file app.js o il progetto non funzionerà.
Disponibile su https://developer.marvel.com


<h1>English:</h1>

The project contacts the Marvel APIs to download the list of heroes with name and description, saves it on MongoDB and then generates a GET REST Endpoint to obtain the data in JSON type. To access the endpoint the user will need to use a Marvel public key, the datas are already present in the database, this process only acts as an OAuth authenticator.

The APIs are available at {SERVER}/heroes/{KEY} to receive the whole list and {SERVER}/heroes/{KEY}/{ID} to receive only the hero with that ID.

If the public_key is invalid the user will receive an error.

To test the project you can use my Public key in the URL: f64bb55328851276fe1de69c2d0349df.

REMEMBER: Insert a Public and a Private Key in the fields PUBLIC_KEY and PRIVATE_KEY in app.js.
You can get your keys at https://developer.marvel.com
