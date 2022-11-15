const express = require('express');
var app = express();
var api = require('./routes/apiRoutes')
var html = require('./routes/htmlRoutes')

var PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended : true }));

app.use(express.json());

app.use(express.static('./public'));

app.use(('./public'));

app.use(('/api', api ));



// require('./routes/apiRoutes')(app);

// require('./routes/htmlRoutes')(app);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);