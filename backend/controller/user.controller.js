//init
const router = require("express").Router();
const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
//middleware

//db process

//save
router.post("/", (req, res) => {
  let user = new User(req.body.user);

  console.log("user: " + user);
  user.password = bcrypt.hashSync(req.body.user.password, 10);
  user
    .save()
    .then((savedUser) => {
      if (savedUser) {
        res.json({
          status: true,
          result: savedUser,
          message: "Account Registered Successfully!",
        });
      } else {
        res.json({
          status: false,
          result: null,
          message: "Account Registeration Failed!",
        });
      }
    })
    .catch((e) => {
      //error code for duplicate key is 11000, response status code for duplicate key is 409
      if (e.code == 11000) {
        message = "";
        return res.json({
          status: false,
          message: "Email already in use! please use another email.",
          result: e,
        });
      }
      return res.json({
        status: false,
        message: "Failed to register the user!",
        result: e,
      });
    });
});

//sign in
router.post("/sign-in", (req, res) => {
  let newUser = new User(req.body.user);
  console.log(newUser);
  //now find by credentials (defined in User model, this is model method)
  User.findByCredentials(newUser.email, newUser.password)
    .then((user) => {
      //user found, so simply we will return the user but in frontend service we will store this user in session
      return res.json({
        status: true,
        message: "User logged in successfully!",
        result: user,
      });
    })
    .catch((e) => {
      if (e) {
        //400 - bad syntax
        return res.json({
          status: false,
          message: "Oops something went wrong!",
          result: e,
        });
      } else {
        //this means error occure but e = undefined, that means user record not found, that means wrong credentials
        //401 - Unautheraized or wrong credentials
        return res.json({
          status: false,
          message: "Wrong Credentials!",
          result: "User not found!",
        });
      }
    });
});

//export
module.exports = router;
