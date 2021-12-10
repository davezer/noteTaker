const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded ({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

const { notes } = require('./db/db.json');




// GET route
app.get('/api/notes', (req, res) => {
    res.json(notes);
});

// route to server to accept data to be used or stored server side
app.post('/api/notes', (req,res) => {
    req.body.id = notes.length.toString();

    if (!validateNote(req.body)) {
        res.status(400).send('This note is not formatted properly');
    } else {
        const note = creatNewNote(req.body, notes);

        res.json(note);
    }
});

// route to index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});
// route to notes.html
app.get('notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});
// console log the port is live
app.listen(PORT, () => {
    console.log(`Coming to you live from ${PORT}!`);
});