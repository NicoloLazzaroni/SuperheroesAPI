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

**1. Create DB "heroes"** use heroes<br>
**2. Initialize collection "heroes"** db.heroes.insert({test: "test"})<br><br>
**Start with:** node app.js


<h1>Italiano:</h1>

Il progetto richiede alle API di Marvel la lista di eroi con nome e descrizione, lo salva su MongoDB e genera un REST endpoint  di tipo GET per ottenere i dati in tipo JSON. Per accedere all'endpoint l'utente dovrà usare una chiave pubblica di Marvel. I dati sono già presenti sul database, questo processo funge solo come autenticazione.

Le API sono disponibili a {SERVER}/heroes/{KEY} per ricevere tutta la lista e {SERVER}/heroes/{KEY}/{ID} per ricevere solo l'eroe con quel'ID.

In caso di chiave pubblica errata l'utente riceverà un errore.

Ricordarsi di inserire la chiave pubblica e privata nei field PUBLIC_KEY e PRIVATE_KEY all'interno del file app.js o il progetto non funzionerà.
Disponibile su https://developer.marvel.com


<h1>English:</h1>

The project contacts the Marvel APIs to download the list of heroes with name and description, saves it on MongoDB and then generates a GET REST endpoint to obtain the data in JSON type. To access the endpoint the user will need to use a Marvel public key. Data are already present in the database, this process only acts as authentication.

The APIs are available at {SERVER}/heroes/{KEY} to receive the whole list and {SERVER}/heroes/{KEY}/{ID} to receive only the hero with the input ID.

If the public_key is invalid the user will receive an error.

REMEMBER: Insert a public and a private key in the fields PUBLIC_KEY and PRIVATE_KEY in app.js.
You can get your keys at https://developer.marvel.com
