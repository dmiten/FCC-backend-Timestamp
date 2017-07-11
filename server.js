var server = require("express");
var moment = require("moment");
var fs = require("fs");
var path = require("path");

var app = server();
var port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("Listening on port: " + port)
});

app.get("/", (req, res) => {
  var fileName = path.join(__dirname, "index.html");
  res.sendFile(fileName, (err) => {
    if (err) {
      console.log(err);
      res.status(err.status).end()
    }
    else {
      console.log("Sent:", fileName)
    }
  })
});

app.get("/:datestring", (req,res) => {
  var date = (/^\d{8,}$/.test(req.params.datestring)) ?
      moment(req.params.datestring, "X") :
      moment(new Date(req.params.datestring));
  if(date.isValid()) {
    res.json({
      unix: date.format("X"),
      natural: date.format("MMMM D, YYYY")
    })
  } else {
    res.json({
      unix: null,
      natural: null
    })
  }
});