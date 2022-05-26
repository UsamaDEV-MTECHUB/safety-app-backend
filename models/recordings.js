const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reports = new Schema(
  {
    audioLink: {
      type: String,
      default: null,
    },
    videoLink: {
      type: String,
      default: null,
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

module.exports = mongoose.model("recordings", reports);
