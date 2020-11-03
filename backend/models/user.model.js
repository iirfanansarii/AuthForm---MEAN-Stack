//init
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
//schema
const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    index: true,
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
});

//model method
//find by credentials
UserSchema.statics.findByCredentials = function (email, password) {
  let User = this;
  return User.findOne({ email }).then((user) => {
    if (!user) return Promise.reject();

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

///model
const UserModel = mongoose.model("Users", UserSchema);

//export
module.exports = mongoose.model("Users");
