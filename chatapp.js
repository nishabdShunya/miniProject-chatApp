/* PROBLEM STATEMENTS
    1. When the user hits url ==> "/login", show a form to the user to enter his username.
    2. Once the user enters the username store it in the browser's local storage.
    3. Redirect the user to url ==> "/" and show him the send message form.
    4. Once the user sends a message store it in the file as "username": "message".
    5. While reading the message from the file now show who sent the message above the message form.
    6. Now open another tab in incognito and login via a different username. On sending message now this application works like a group chat.
*/

/* SOLUTION */

// Importing Third-Party Modules
const express = require('express');
const bodyParser = require('body-parser');

// Importing Local Modules
const userRoutes = require('./routes/user')
const msgRoutes = require('./routes/msg')

// Invoking Express JS for chatApp
const chatApp = express();

// Invoking body parsing functionality for chatApp
chatApp.use(bodyParser.urlencoded({ extended: false }));

// Routing Logic
chatApp.use(userRoutes);
chatApp.use(msgRoutes);

// Listening for connections
chatApp.listen(3000);