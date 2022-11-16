//link necessary packages and dependencies
const express = require("express");
const app = express();

//sets port by looking for system port or using 3001 if none found
const PORT = process.env.PORT || 3001;

//console logs server side req type, path and date
const middleware = (req, res, next) => {
  console.log(`${req.method} ${req.path} at ${Date.now()}`);
  next();
};

// Sets up middleware 
app.use(middleware);

// Sets up data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets up public folder 
app.use(express.static("public"));

//Sets up API route
require("./routes/apiRoutes")(app);

// Sets up HTML route
require("./routes/htmlRoutes")(app);

//Sets up port to deploy/start the app
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
