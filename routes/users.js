var express = require("express");
var router = express.Router();
var user = require("../controller/user");
var auth = require("../midelwares/auth");
var passport = require("passport");
const upload = require("../midelwares/upload");
/* GET users listing. */
router.get("/detail", auth.verifyUser, user.allUser);
router.post("/detail", auth.verifyUser, upload.single("image"), user.editUser);
router.delete("/detail", auth.verifyUser, user.deleteUSer);
router.post("/signup", user.signup);
router.post("/login", passport.authenticate("local"), user.login);
router.post("/verify", auth.verifyUser, user.login);

module.exports = router;
