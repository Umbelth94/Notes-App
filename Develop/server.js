//To do: Get this to work and then see if we can modularize it

const express = require('express');
const path = require('path');
const notesData = require('./db/db.json')
const fs = require('fs');

const PORT = 3001;
const app = express();


app.use(express.static('public'));
app.use(express.json());


app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

// app.get('/notes', (req,res) => res.send(path.join(__dirname, '/public/notes.html')));
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(notesData);
})

//POST /api/notes should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.  You'll need to find a way to give each note a unique id when it's saved
app.post('/api/notes', (req, res) => {
    const newNote = req.body;
    newNote.id = notesData.length + 1;
    newNote.flargus = 'Margus';
    notesData.push(newNote);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notesData));
    res.json(newNote);
});

app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/public/index.html')));
//The following API routes should be created: 
    //Get /api/notes should read the db.json file and return all saved notes as JSON
    


//BONUS:
    //DELETe /api/notes/:id should recieve a query parameter containing the id of a note to delete.  IN order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file