const reportsModel = require("../models/reports");
const recordingsModel = require("../models/recordings");
const guardian = require("../models/guardian");
const { sendSmsMessage, sendWhatsAppMessage } = require("./twelio");

exports.addReport = (req, res, next) => {
  var { type, latitude, longitude, data, feedback } = req.body;
  if (data) data = JSON.parse(data);
  const { path: picture } = req.file || {};
  latitude = Number(latitude);
  longitude = Number(longitude);
  reportsModel
    .create({
      type,
      location: { latitude, longitude },
      data,
      feedback,
      picture,
    })
    .then((report) => {
      console.log(report);
      res.json({ success: true, report });
    });
};

exports.getReports = (req, res, next) => {
  const { type } = req.query;
  var query = {};
  if (type == "customer") query.status = "verified";
  reportsModel.find(query).then((reports) => {
    res.json(reports);
  });
};

exports.approveReport = (req, res, next) => {
  const { _id } = req.body;
  reportsModel.updateOne({ _id }, { status: "verified" }).then((reports) => {
    res.json({ success: true });
  });
};

exports.deleteReport = (req, res, next) => {
  const { _id, status } = req.body;
  reportsModel.deleteOne({ _id }).then((reports) => {
    res.json({ success: true });
  });
};

exports.uploadRecording = (req, res, next) => {
  const { video, audio } = req.files;
  console.log(audio);
  console.log(video);
  const { _id: user } = req.user;
  var videoLink, audioLink;
  if (video && video[0]) videoLink = video[0].path;
  if (audio && audio[0]) audioLink = audio[0].path;
  recordingsModel.create({ audioLink, videoLink, user }).then((recording) => {
    res.json(recording);
  });
};

exports.getRecordings = (req, res, next) => {
  const { type, all } = req.query;
  const { _id: user } = req.user;
  var query = { user };
  if (all) query = {};
  if (type == "audio") query.audioLink = { $ne: null };
  if (type == "vedio") query.videoLink = { $ne: null };
  recordingsModel.find(query).then((recordeings) => {
    res.json(recordeings);
  });
};

exports.sendMessage = (req, res, next) => {
  const { url } = req.body;
  
  const { _id: user } = req.user;
  guardian.find({ user }).then(async (guar) => {

    var success = false;
    for (let i = 0; i < guar.length; i++) {
      const element = guar[i];
     var s = await sendSmsMessage(element.phone, url);
     if(s) success = true
    }
    res.json({ success });
  });
};

exports.sendReportsToGuardian = (req, res, next) => {
  const { baseUrl } = req.body;
  const { path } = req.file || {};
  const { _id: user } = req.user;
  guardian.findOne({ user }).then((guar) => {
    sendSmsMessage(guar.phone, baseUrl + path);
    sendWhatsAppMessage(guar.phone, baseUrl + path);
    res.json({});
  });
};
