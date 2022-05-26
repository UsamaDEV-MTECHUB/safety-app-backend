const mongoose = require("mongoose");
var passportloaclmongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const guardian = new Schema(
  {
    phone: {
      type: String,
    },
    phone1: {
      type: String,
    },
    email: {
      type: String,
    },
    photo: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("guardian", guardian);
