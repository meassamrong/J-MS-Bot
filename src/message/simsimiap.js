const simsimi = require('simsimi')({
  key: "replace this with ur Simsime api key",
});

const randomReplyMessage = {
  randomReplyMessage(msgContent, msg) {
    simsimi(msgContent)
      .then(response => {
        msg.reply(response);
      });
  }
}

module.exports = randomReplyMessage;