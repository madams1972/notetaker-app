//This should link to the path this app will use
var path = require("path");
//This is the api path for sending HTML files
module.exports = function (app) {
  // The code below returns notes.html file
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
  });
  // The code below returns index.html file
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  // The code below allows us to default back to index.html if no route is found 
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });
};
