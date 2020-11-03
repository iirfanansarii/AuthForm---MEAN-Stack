//initialization
const mongoose = require("mongoose");
const assert = require("assert");
const db_url = "mongodb://127.0.0.1:27017/UserForm"
//connection to Mongo Database
mongoose.connect(
  db_url,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  },
  (error, link) => {
    //check for error occure while connecting mongo database
    assert.equal(error, null, "Database connection failed!");
    //everything is ok, so database connected successfully
  }
);

//exporting mongo db
module.exports = mongoose;
