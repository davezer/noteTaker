const path = require('path');
const fs = require('fs');

const addNewNote = (newNote, notes) => {
    notes.push(newNote);
    fs.writeFileSync(
        path.join(__dirname, '../db/db.json'),
        JSON.stringify({ notes }, null, 2)
    );
    return notes;
};

module.exports = { addNewNote };