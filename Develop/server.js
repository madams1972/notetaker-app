//link packages and dependencies
const express = require("express");
const app = express();

//sets port by first looking for system port then using 3001 if none found
const PORT = process.env.PORT || 3001;

//console logs server side req type, path and time
const middleware = (req, res, next) => {
  console.log(`${req.method} ${req.path} at ${Date.now()}`);
  next();
};

// Sets up express to use middleware function
app.use(middleware);

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//setup public folder for images, js, css
app.use(express.static("public"));

//API route
require("./routes/apiRoutes")(app);

// HTML route
require("./routes/htmlRoutes")(app);

//Sets port to be used by deployed app
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
