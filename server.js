//TODO: MODULARIZE
//TODO: Get delete to work
    //Utilize a better function for generating id's.

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
    notesData.push(newNote);
    fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(notesData));
    res.json(newNote);
});

function removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    var filteredNotes = notesData.filter((note) => note.id !== id)
    return filteredNotes;
    //   .then((filteredNotes) => this.write(filteredNotes));
}



// app.delete('/api/notes/:id', (req, res) => {
//     console.log('hitting delete');
//     const noteId = req.params.id;
//     var newNotes = removeNote(noteId);
    //Use filter here 
    // for (let i = 0; i < notesData.length ; i++) {
    //     console.log('notesData '+ i, 'noteId ' + noteId, notesData[i]);
    // if ([i] == noteId) {
    //         console.log(notesData[i], noteId);
    //         notesData.splice(i, 1);
    //     }
    // }
//     fs.writeFileSync(path.join(__dirname, '/db/db.json'), JSON.stringify(newNotes));
//     res.json(newNotes);
// })


app.get('*', (req,res) => res.sendFile(path.join(__dirname, '/public/index.html')));
