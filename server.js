const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");

const app = express();

const options = {
  key: fs.readFileSync(path.join(__dirname, "localhost-key.pem")),
  cert: fs.readFileSync(path.join(__dirname, "localhost.pem")),
};

app.use(express.static(__dirname));

const port = 8443;

https.createServer(options, app).listen(port, () => {
  console.log(`Server running on https://localhost:${port}`);
});
