var userModel = require("../models/user");
var auth = require("../midelwares/auth");
exports.signup = (req, res, next) => {
  var { username, password } = req.body;
  var username = String(username).toLowerCase().trim();
  userModel.register(
    new userModel({
      username: username,
    }),
    password,
    (err, user) => {
      if (err) {
        next(err);
      }
      if (user) {
        user.save((err, user) => {
          if (err) {
            next(err);
          } else {
            var token = auth.getToken({ _id: user._id });
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json({ user: user, success: true, token });
          }
        });
      }
    }
  );
};
exports.login = (req, res, next) => {
  var token = auth.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.json({ user: req.user, token, success: true });
};
exports.allUser = (req, res, next) => {
  var { q, _id } = req.query;
  var query = {};
  if (_id) query._id = _id;

  if (q)
    query.$or = [
      { name: { $regex: q, $options: "i" } },
      { username: { $regex: q, $options: "i" } },
    ];
  userModel.find(query).then((users) => {
    res.json(users);
  });
};
exports.deleteUSer = async (req, res, next) => {
  var { _id } = req.query;
  await userModel.deleteOne({ _id });
  res.json({ success: true });
};
exports.editUser = (req, res, next) => {
  var { _id: user } = req.user;
  var { firstName, lastName, phone, gender, _id } = req.body;
  if (!_id) _id = user;
  var { path: photo } = req.file || {};
  console.log(req.file);
  if (!firstName || !lastName || !phone || !gender || !photo)
    userModel
      .findById(_id)
      .then(
        (user) => {
          // if (
          //   (!user.firstName && !firstName) ||
          //   (!user.lastName && !lastName) ||
          //   (!user.phone && !phone)
          // )
          //   return res
          //     .status(202)
          //     .json({ message: "Please enter all information!" });
          if (firstName) user.firstName = firstName;
          if (lastName) user.lastName = lastName;
          if (phone) user.phone = phone;
          if (gender) user.gender = gender;
          if (photo) user.photo = photo;
          user
            .save()
            .then(
              (user) => {
                res.json(user);
              },
              (e) => next(e)
            )
            .catch((e) => next(e));
        },
        (e) => next(e)
      )
      .catch((e) => next(e));
};
