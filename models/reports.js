const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reports = new Schema(
  {
    type: {
      type: String,
    },
    picture: {
      type: String,
    },
    location: {
      type: Object,
    },
    data: Object,
    status: {
      type: Object,
      default: "unverified",
    },
    feedback: {
      type: Object,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("reports", reports);
