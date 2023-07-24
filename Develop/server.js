// Importing and running express.js
const express = require('express');
const path = require('path');
const app = express();
const PORT = 3001;
// Importing notes section
const notes = require('./db/db.json')

app.use(express.static('public'));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html')),
    res.json(notes)
);

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);