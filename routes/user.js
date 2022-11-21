// Importing Third-Party Modules
const express = require('express');

// Invoking the router
const router = express.Router();

// Showing the username form on "/login" and storing the user's input in the local storage
router.get('/login', (req, res, next) => {
    res.send(`  
    <form action="/login" method="POST" onSubmit="localStorage.setItem('username', document.getElementById('username').value)">
        <label for="username">Username:</lable>
        <input type="text" name="username" id="username">
        <button type="submit">SUBMIT</button>
    </form>
    `);
});

// Redirecting the user to "/"
router.post('/login', (req, res, next) => {
    res.redirect('/');
});

// Exporting the router
module.exports = router;