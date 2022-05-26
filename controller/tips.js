var userModel = require("../models/user");
var guardianModel = require("../models/guardian");
var tipsModel = require("../models/tips");
var auth = require("../midelwares/auth");
exports.getAllTips = (req, res, next) => {
  tipsModel.find({}).then((tips) => {
    res.json(tips);
  });
};
exports.deleteTip = async (req, res, next) => {
  var { _id } = req.query;
  await tipsModel.deleteOne({ _id });
  res.json({ success: true });
};
exports.updateTip = async (req, res, next) => {
  var { _id, name } = req.body;
  await tipsModel.updateOne({ _id }, { name });
  res.json({ success: true });
};
exports.addTips = (req, res, next) => {
  var { name } = req.body;
  var { path: video } = req.file || {};
  tipsModel
    .create({
      video,
      name,
    })
    .then((tips) => {
      res.json(tips);
    });
};
