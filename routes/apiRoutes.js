const router = require('express').Router();
let { notes } = require('../db/db.json');
const path = require('path');
const fs = require('fs');
const { addNewNote } = require('../lib/addNewNote.js');
const { title } = require('process');

router.get('/notes', (req, res) => {
    res.json(notes);
});

router.post('/notes', (req, res) => {
    const newNote = {
        id: req.body.id,
        title: req.body.title,
        text: req.body.text
    }

    addNewNote(newNote, notes);
});

// delete route

router.delete('/notes/:id', (req, res) => {
    const exists = notes.some(notes => notes.id === req.params.id);
    if (exists) {
        notes = notes.filter(notes => notes.id !== req.params.id);
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify({ notes }, null, 2));
        res.json(notes);
    } else {
        res.status(400).send('Note not found.')
    }
});

module.exports = router;