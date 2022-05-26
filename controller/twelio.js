const accountSid = "AC5166603f22a50b7622e1e8a320f93467";
const authToken = "72f5f6721bdcde17034545f65e64c096";
const client = require("twilio")(accountSid, authToken);

exports.sendSmsMessage = async (phone, body) => {
  return client.messages
    .create({ body: "\n" + body, from: "+15617084680", to: phone })
    .then((message) => {
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
};

exports.sendWhatsAppMessage = async (phone, body) => {
  return client.messages
    .create({
      from: "whatsapp:+15617084680",
      body: body,
      to: "whatsapp:" + phone,
    })
    .then((message) => {
      return true;
    })
    .catch((e) => {
      console.log(e);
      return false;
    });
};
