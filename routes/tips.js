var express = require("express");
var router = express.Router();
var user = require("../controller/user");
var guardian = require("../controller/guardian");
var tips = require("../controller/tips");
var auth = require("../midelwares/auth");
var passport = require("passport");
const upload = require("../midelwares/upload");
/* GET users listing. */
router.get("/detail", auth.verifyUser, tips.getAllTips);
router.delete("/detail", auth.verifyUser, tips.deleteTip);
router.put("/detail", auth.verifyUser, tips.updateTip);
router.post("/detail", auth.verifyUser, upload.single("image"), tips.addTips);

module.exports = router;
