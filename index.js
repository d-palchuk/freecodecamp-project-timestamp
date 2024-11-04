// index.js
// where your node app starts

// init project
const express = require('express');
const app = express();
const dateUtils = require('./dateUtils');

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


app.get("/api/:date?", function (req, res) {

  const dateValue = Number(req.params.date) || req.params.date || Date.now();

  if (!dateUtils.isDateValid(dateValue)) {
    return res.json({ error : "Invalid Date" });
  }

  const dateInstance = new Date(dateValue);

  res.json({
    unix: dateInstance.getTime(),
    utc: dateInstance.toUTCString()
  });
});



// Listen on port set in environment constiable or default to 3000
const listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
