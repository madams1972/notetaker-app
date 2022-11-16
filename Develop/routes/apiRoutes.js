//link necessary packages and dependencies
const path = require("path");
const fs = require("fs");
const uui = require("../helpers/uuid");

//get stored JSON information from db.json
const readData = () => {
  const noteData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"))
  );
  return noteData;
};

//store new data to db.json
const writeData = (noteData) => {
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(noteData),
    (err) => {
      if (err) return { err };
    }
  );
};

//api functions to be used by other apps within site to access/create persistent data
module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    let noteData = readData();
    res.json(noteData);
  });

  //api for adding new notes
  app.post("/api/notes", (req, res) => {
    let noteData = readData();
    let newNote = req.body;
    let newNoteID = uui();

    newNote.id = newNoteID;
    noteData.push(newNote);
    writeData(noteData);
    return res.json(noteData);
  });

  //api for deleating existing notes
  app.delete("/api/notes/:id", (req, res) => {
    let noteData = readData();
    const noteId = req.params.id;
    const newNoteData = noteData.filter((note) => note.id != noteId);

    writeData(newNoteData);
    res.send(newNoteData);
  });
};
