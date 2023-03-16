const config = require("./src/config.js")
const listenerChannelId = config.ListenerCHForTem; // Replace this with the ID of your listener voice channel
const database = require("./database.js")
const util = require('util');
const delay = util.promisify(setTimeout);
var userChannelsid = [''];
const CreateTemporaryVoiceChannels = {
  async CreateVoiceChannelsTem(oldState, newState) {
    // Check if the user joined or left the listener voice channel
    if (newState.channel && newState.channel.id === listenerChannelId) {
      // User joined the Listener voice channel
      const channelName = `${newState.member.user.username}'s Room`
      const newChannel = await newState.guild.channels.create(channelName, {
        type: 'GUILD_VOICE',
        parent: newState.channel.parent,
        permissionOverwrites: [
          {
            id: newState.member.id,
            allow: ['MANAGE_CHANNELS'],
          },
        ],
      });
      await newState.setChannel(newChannel);
        database.pushData({channelID: newState.channel.id})
      const UserChannelsID = await database.pullData()
      userChannelsid = UserChannelsID
    } else if ( oldState.channel && oldState.channel.id !== listenerChannelId && oldState.channel.members.size === 0 && userChannelsid.find(channels => channels.channelID == oldState.channel.id)) {
      await delay(4000); // Wait for 200 seconds
       oldState.channel.delete();
       database.deleteData(oldState.channel.id)
    }
  }
}
module.exports = CreateTemporaryVoiceChannels;