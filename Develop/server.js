// require express
const express = require('express');

// Tells node that we are creating an "express" server
var app = express();
// Sets an initial port.
var PORT = process.env.PORT || 3001;
// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended : true }));
app.use(express.json());
//setup public folder for images, js, css
app.use(express.static('./public'));

//ROUTES
//API 
require('./routes/apiRoutes')(app);
// HTML 
require('./routes/htmlRoutes')(app);
// LISTENER
// The below code effectively "starts" our server
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);