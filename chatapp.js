/* PROBLEM STATEMENTS
    1. When the user hits url ==> "/login", show a form to the user to enter his username.
    2. Once the user enters the username store it in the browser's local storage.
    3. Redirect the user to url ==> "/" and show him the send message form.
    4. Once the user sends a message store it in the file as "username": "message".
    5. While reading the message from the file now show who sent the message above the message form.
    6. Now open another tab in incognito and login via a different username. On sending message now this application works like a group chat.
*/

/* SOLUTION */

// Importing Core Modules
const fs = require('fs');

// Importing Third-Party Modules
const express = require('express');
const bodyParser = require('body-parser');

// Invoking Express JS for chatApp
const chatApp = express();

// Invoking body parsing functionality for chatApp
chatApp.use(bodyParser.urlencoded({ extended: false }));

// Showing the username form on "/login" and storing the user's input in the local storage
chatApp.get('/login', (req, res, next) => {
    res.send(`  
    <form action="/login" method="POST" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
        <label for="username">Username:</lable>
        <input type="text" name="username" id="username">
        <button type="submit">SUBMIT</button>
    </form>
    `);
});

// Redirecting the user to "/"
chatApp.post('/login', (req, res, next) => {
    res.redirect('/');
});

// Showing the message form on "/"; Also, reading data from "chat-history.txt" file and displaying it above form
chatApp.get('/', (req, res, next) => {
    fs.readFile('chat-history.txt', (err, data) => {
        if (err) {
            data = 'No Messages Found';
        }
        res.send(`  
        <h3>${data}</h3>
        <form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
            <label for="message">Message:</label>
            <input type="text" name="message" id="message">
            <input type="hidden" name="username" id="username">
            <button type="submit">SEND</button>
        </form>
        `);
    });
});

// Storing the username and message in "chat-history.txt" file
chatApp.post('/', (req, res, next) => {
    const userMsg = `${req.body.username}: ${req.body.message}`;
    fs.writeFile('chat-history.txt', userMsg, { flag: 'a' }, (err) => {
        if (err) {
            console.log(err);
        }
        else {
            res.redirect('/');
        }
    });
});

// Listening for connections
chatApp.listen(3000);