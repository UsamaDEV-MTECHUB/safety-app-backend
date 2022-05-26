const mongoose = require("mongoose");
var passportloaclmongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const users = new Schema(
  {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    phone: {
      type: String,
    },
    photo: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

users.plugin(passportloaclmongoose);

module.exports = mongoose.model("user", users);
