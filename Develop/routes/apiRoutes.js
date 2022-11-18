//The code below will pull in the dependencies
const path = require("path");
const fs = require("fs");
const uui = require("../helpers/uuid");

//The code below will get notes from the datat base db.json
const readData = () => {
  const noteData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"))
  );
  return noteData;
};

//the code below stores new notes to the datat base db.json
const writeData = (noteData) => {
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(noteData),
    (err) => {
      if (err) return { err };
    }
  );
};

  //The code below is an api for getting notes

module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    let noteData = readData();
    res.json(noteData);
  });

  //The code below is an api for posting notes
  app.post("/api/notes", (req, res) => {
    let noteData = readData();
    let newNote = req.body;
    let newNoteID = uui();

    newNote.id = newNoteID;
    noteData.push(newNote);
    writeData(noteData);
    return res.json(noteData);
  });

  //The code below is an api for deleting  notes
  app.delete("/api/notes/:id", (req, res) => {
    let noteData = readData();
    const noteId = req.params.id;
    const newNoteData = noteData.filter((note) => note.id != noteId);

    writeData(newNoteData);
    res.send(newNoteData);
  });
};
