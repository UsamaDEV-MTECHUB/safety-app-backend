var express = require("express");
var router = express.Router();
var reports = require("../controller/reports");
var auth = require("../midelwares/auth");
const upload = require("../midelwares/upload");
/* GET users listing. */
router.get("/detail", reports.getReports);
router.post(
  "/detail",
  auth.verifyUser,
  upload.single("picture"),
  reports.addReport
);
router.put("/detail", auth.verifyUser, reports.approveReport);
router.patch("/detail", auth.verifyUser, reports.deleteReport);

router.get("/recording", auth.verifyUser, reports.getRecordings);
router.put("/send", auth.verifyUser, reports.sendMessage);
router.post(
  "/send",
  auth.verifyUser,
  upload.single("vedio"),
  reports.sendReportsToGuardian
);
router.post(
  "/recording",
  auth.verifyUser,
  upload.fields([
    { name: "video", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  reports.uploadRecording
);

module.exports = router;
