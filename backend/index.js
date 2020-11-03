//init
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const UserController = require('./controller/user.controller')
require('./mongoose')
//app
const app = express();
app.use(bodyParser.json());

//middleware
app.use(cors());


//controllers
app.use('/users' , UserController );

app.listen(3000, () => {
  console.log("server listen on : " + 3000);
});
