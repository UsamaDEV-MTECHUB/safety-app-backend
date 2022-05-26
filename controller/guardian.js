var userModel = require("../models/user");
var guardianModel = require("../models/guardian");
var auth = require("../midelwares/auth");
exports.getAllGuardians = (req, res, next) => {
  var { _id } = req.user;
  var query = {};
  if (_id) query.user = _id;

  guardianModel.find(query).then((users) => {
    res.json(users);
  });
};
exports.addGuardian = (req, res, next) => {
  var { _id: user } = req.user;
  var { phone, email, phone1 } = req.body;
  var { path: photo } = req.file || {};
  guardianModel
    .create({
      user,
      phone,
      phone1,
      email,
      photo,
    })
    .then((user) => {
      res.json(user);
    });
};
exports.yuyGuardian = (req, res, next) => {
  var { phone, email, _id } = req.body;
  var u = {};
  if (email) u.email = email;
  if (phone) u.phone = phone;
  guardianModel.updateOne({ _id }, u).then((user) => {
    res.json(user);
  });
};
