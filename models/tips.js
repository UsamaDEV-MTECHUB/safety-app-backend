const mongoose = require("mongoose");
var passportloaclmongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;

const tips = new Schema(
  {
    video: {
      type: String,
    },
    name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tips", tips);
