var passport = require("passport");
var localstrategy = require("passport-local");
// var user= require('./models/users');
// var customerModel= require('./models/customer_Details_model');
var jwtStrategy = require("passport-jwt").Strategy;
var ExtractJwt = require("passport-jwt").ExtractJwt;
var jwt = require("jsonwebtoken");
var config = require("../services/config");
var userModel = require("../models/user");

exports.local = passport.use(new localstrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());
exports.getToken = function (user) {
  return jwt.sign(user, config.secretKey);
};
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtpassport = passport.use(
  new jwtStrategy(opts, (jwt_payload, done) => {
    if (jwt_payload.forgotPassword) {
      return done(null, jwt_payload);
    } else
      userModel.findOne({ _id: jwt_payload._id }, (err, user) => {
        if (err) {
          console.log("fail");
          return done(err, false);
        } else if (user) {
          console.log("user");

          return done(null, user);
        } else {
          console.log("null");

          return done(null, false);
        }
      });
  })
);

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  var { user } = req;
  if (user.type === "admin") {
    next();
  } else {
    err = new Error("You are not authorized as Admin!");
    err.status = 403;
    return next(err);
  }
};
exports.verifyAdminAndManager = (req, res, next) => {
  var { user } = req;
  if (user.type === "admin" || user.type === "manager") {
    next();
  } else {
    err = new Error("You are not authorized as Admin or Manager!");
    err.status = 403;
    return next(err);
  }
};
