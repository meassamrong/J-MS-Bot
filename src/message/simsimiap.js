const simsimi = require('simsimi')({
  key: 'o8e3_2X6fIrAAEi4NIqd7KMjrQB4fgqT~L~Dw3Kr',
});

const randomReplyMessage = {
  randomReplyMessage(msgContent, msg) {
    simsimi(msgContent)
      .then(response => {
        msg.reply(response);
        //console.log('simsimi say:', response); // What's up ?
      });
  }
}

module.exports = randomReplyMessage;