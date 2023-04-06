const { logChannels } = require('../config.js');
const sendLog = {
    async sendLog(messageLog, client){
      const LogChannels= client.channels.cache.get(logChannels);
      await LogChannels.send(messageLog)
    }
}
module.exports = sendLog;