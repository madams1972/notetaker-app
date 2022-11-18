//link Express packages and dependencies
const express = require("express");
const app = express();

//Looks for system port or use 3001 if none found
const PORT = process.env.PORT || 3001;

//console logs server side request type, path and date
const middleware = (req, res, next) => {
  console.log(`${req.method} ${req.path} at ${Date.now()}`);
  next();
};

// Middleware function
app.use(middleware);

// Allows the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Sets up the public folder 
app.use(express.static("public"));

//The code below is the API route
require("./routes/apiRoutes")(app);

// The code belwo is the HTML route
require("./routes/htmlRoutes")(app);

//The code below is the port the app will start on
app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
