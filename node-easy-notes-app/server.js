//setting up web server
//require express and body parser
const express = require('express');
const bodyParser = require('body-parser');

// create new express app
const app = express();

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())


// Configuring the database
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});


// define a simple route
app.get('/', (req, res) => {
    res.json({ "message": "Welcome to EasyNotes application. Take notes quickly. Organize and keep track of all your notes." });
});
// Require Notes routes
require('./app/routes/note.routes.js')(app);
// listen for requests
app.listen(3000, () => {
    console.log("Server is listening on port 3000");
});

//server setup
//to kill a listen to port 300
/*taskkill /F /IM node.exe*/
//installed the 32 bit version of monogo
//created c:data\db to store db 
//open the path of the exe of monogo and wrote mongod --storageEngine=mmapv1 --dbpath [your-path]
// then in another terminal monogo use cmd

//explanation to memorize
/*First, We import express and body-parser modules. Express, as you know, is a web framework that we’ll be using for building the REST APIs, and body-parser is a module that parses the request (of various content types) and creates a req.body object that we can access in our routes.

Then, We create an express app, and add two body-parser middlewares using express’s app.use() method. A middleware is a function that has access to the request and response objects. It can execute any code, transform the request object, or return a response.

Then, We define a simple GET route which returns a welcome message to the clients.

Finally, We listen on port 3000 for incoming connections.

All right! Let’s now run the server and go to http://localhost:3000 to access the route we just defined.*/