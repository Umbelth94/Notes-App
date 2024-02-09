const express = require('express');
const path = require('path');

const PORT = 3001;
const app = express();

app.use(express.static('public'));

app.listen(PORT, () => console.log(`App listening at http://localhost:${PORT}`));

//Create the following HTML routes:
    //Get /notes should return the notes.html file
    //Get * should return the index.html file

//The following API routes should be created: 
    //Get /api/notes should read the db.json file and return all saved notes as JSON
    //POST /api/notes should recieve a new note to save on the request body, add it to the db.json file, and then return the new note to the client.  You'll need to find a way to give each note a unique id when it's saved

//BONUS:
    //DELETe /api/notes/:id should recieve a query parameter containing the id of a note to delete.  IN order to delete a note, you'll need to read all notes from the db.json file, remove the note with the given id property, and then rewrite the notes to the db.json file