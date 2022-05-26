var express = require("express");
var router = express.Router();
var users = require("./users");
var tips = require("./tips");
var guardians = require("./guardians");
var reports = require("./reports");
/* GET home page. */
router.use("/users", users);
router.use("/guardians", guardians);
router.use("/tips", tips);
router.use("/reports", reports);

module.exports = router;
