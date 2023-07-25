// Importing and running express.js
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3001;
// Importing notes
const notes = require('./db/db.json')

// Placeholder for unique ID
const uuid = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

app.use(express.static('public'));
app.use(express.json());

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
)

app.get('/notes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/notes.html'))
)

app.get('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => res.send(data))
});

// Write notes and save to json file
app.post('/api/notes', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        const notes = JSON.parse(data)
        const newNote = {...req.body, id:uuid()}
        notes.push(newNote)
        fs.writeFile('./db/db.json', JSON.stringify(notes), (error) => res.json(newNote))
    })
})

// Delete notes
app.delete('/api/notes/:id', (req, res) => {
    fs.readFile('./db/db.json', 'utf-8', (error, data) => {
        const notes = JSON.parse(data)
        const updatedNotes = notes.filter(note => note.id !== req.params.id)
        fs.writeFile('./db/db.json', JSON.stringify(updatedNotes), (error) => res.json('Okay'))
    })
})

app.listen(PORT, () => 
    console.log(`Example app listening at http://localhost:${PORT}`)
);