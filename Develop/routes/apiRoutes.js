//This should link all the packages and dependencies this app will use
const path = require("path");
const fs = require("fs");
const uui = require("../helpers/uuid");

//This function allows us to get notes stored in db.json
const readData = () => {
  const noteData = JSON.parse(
    fs.readFileSync(path.join(__dirname, "../db/db.json"))
  );
  return noteData;
};

//This adds new notes to db.json
const writeData = (noteData) => {
  fs.writeFileSync(
    path.join(__dirname, "../db/db.json"),
    JSON.stringify(noteData),
    (err) => {
      if (err) return { err };
    }
  );
};

//api functions used by the apps within the site to access and create notes
module.exports = function (app) {
  app.get("/api/notes", (req, res) => {
    let noteData = readData();
    res.json(noteData);
  });

  //This is the api for adding notes
  app.post("/api/notes", (req, res) => {
    let noteData = readData();
    let newNote = req.body;
    let newNoteID = uui();

    newNote.id = newNoteID;
    noteData.push(newNote);
    writeData(noteData);
    return res.json(noteData);
  });

  //This is the api for deleting notes
  app.delete("/api/notes/:id", (req, res) => {
    let noteData = readData();
    const noteId = req.params.id;
    const newNoteData = noteData.filter((note) => note.id != noteId);

    writeData(newNoteData);
    res.send(newNoteData);
  });
};
