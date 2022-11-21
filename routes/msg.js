// Importing Core Modules
const fs = require('fs');

// Importing Third-Party Modules
const express = require('express');

// Invoking the router
const router = express.Router();

// Showing the message form on "/"; Also, reading data from "chat-history.txt" file and displaying it above form
router.get('/', (req, res, next) => {
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
router.post('/', (req, res, next) => {
    const userMsg = `${req.body.username}: ${req.body.message}`;
    fs.writeFile('chat-history.txt', userMsg, { flag: 'a' }, (err) => {
        return err ? console.log(err) : res.redirect('/');
    });
});

// Exporting the router
module.exports = router;