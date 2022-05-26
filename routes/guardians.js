var express = require("express");
var router = express.Router();
var user = require("../controller/user");
var guardian = require("../controller/guardian");
var auth = require("../midelwares/auth");
var passport = require("passport");
const upload = require("../midelwares/upload");
/* GET users listing. */
router.get("/detail", auth.verifyUser, guardian.getAllGuardians);
router.post(
  "/detail",
  auth.verifyUser,
  upload.single("image"),
  guardian.addGuardian
);
router.put("/detail", auth.verifyUser, guardian.yuyGuardian);

module.exports = router;
