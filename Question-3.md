The JS file below has a few errors, can you indentify and fix them?

```js
const express = require(express);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const http = require('http');

/**
 * Assume that these are error free.
 */
const User = require('./models/user');
const logger = require('./utils/logger');

const mongoDB = process.env.MONGO_URI;

const app = express();

mongoose.connect(mongoDB, { useMongoClient: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;

db.on('error', function(error) {
    logger.log(error);
  });


// handler to save user
app.use(bodyParser.json());

var userSchema = new mongoose.Schema(
{
  name: {type: String, required:true},
  role: {type: String, required:true},
  date: {type: Date, default: Date.now}
});

mongoose.model("user", userSchema);


// handler to save user
app.get('/save', function(res, req) {
  const user = new User(req.body);

  user.save(function(err,data) {
    if (err) {
      res.status(500).send(err);
      return logger.log(err);
    }

      res.status(200).send('success');
      return res.json(data);
  });
});



const server = http.createServer(app);

server.listen(80, function() {
    logger.log("Server started");
});

