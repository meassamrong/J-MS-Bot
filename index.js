const { Client, Collection, MessageEmbed } = require("discord.js");
const client = new Client({
  intents: 32767,
});
const { setTimeout } = require('timers/promises');
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
client.commands = new Collection()

const rest = new REST({ version: '9' }).setToken(config.token);
const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };
const simsiApi = require('./src/message/simsimiap.js')
//command-handler
const commands = [];
readdirSync('./src/commands').forEach(async file => {
  const command = require(`./src/commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.on("ready", async () => {
  //post news Feed
  const channelnews = client.channels.cache.get(config.newFeedChannels);
  const postNewFeed = require('./src/message/post_newfeed.js')

  let postDelay = Math.floor(Math.random() * 14400000); //14400000
  setInterval(() => {
    const randomSendTime = Math.floor(Math.random() * 14400000)
    postDelay = randomSendTime;
    postNewFeed.postNewsFeed(channelnews)
  }, postDelay)
  try {
    await rest.put(
      Routes.applicationCommands(client.user.id),
      { body: commands },
    );
  } catch (error) {
    console.error(error);
  }
  log(`${client.user.username}`);
})

// member chat with bot
client.on("messageCreate", (msg) => {
  if (msg.channel.id == config.conversationChannels) {
    const codePreLeng = config.codePreLeng;
    const khmerPreLeng = config.khmerPreLeng;
    const requestAsCode = codePreLeng.some((word) => msg.content.toLowerCase().includes(word))
    const requestAsKhmer = khmerPreLeng.some((word) => msg.content.includes(word));
    console.log(requestAsKhmer)
    if (msg.author.bot) { return false };
    if (requestAsKhmer) {
      const { reqconversationAsKhmer } = require('./src/message/sppKhermConversation.js');
      reqconversationAsKhmer(msg)
    } else if (requestAsCode) {
      //response as code
      const botResponASCode = require('./src/message/botrespondsascode.js')
      botResponASCode.resondindAscode(msg)
    } else {
      //response as coversation
      const conversation = require('./src/message/botconversation.js')
      conversation.conversationBot(msg)
    }
    // User requst ticket for temporary DM 
    const { reqeustDm } = require('./src/events/dmConversation.js');
    if (msg.content == '!pm') {
      reqeustDm(msg);
    }
  }

  //Simsimi Random reply member message
  if (msg.channel.id == config.chatCh) {
    const randomReplyMessage = Math.floor(Math.random() * 1200);
    if (msg.author.bot) {
      return;
    } else {
      if (randomReplyMessage > 700) {
        simsiApi.randomReplyMessage(msg.content, msg)
      }
    }
  }

  // Private Conversation 
  if (msg.guild == null && !msg.author.bot) {
    msg.reply('dosomethinghere')
  }


})
// Voice State Managerments
client.on('voiceStateUpdate', async (oldState, newState) => {
  const CreateTemporaryVoiceChennels = require("./temporaryChannels.js")
  const AllowCreateTemporary = config.allowCreateTemporaryCHformember;
  if (AllowCreateTemporary) {
    await CreateTemporaryVoiceChennels.CreateVoiceChannelsTem(oldState, newState, client)
  }



  const {callMemernameInVoiceChannel} = require('./src/events/welcomeMember.js')
  callMemernameInVoiceChannel(oldState, newState, client)
})
// Monitor user delete message 
client.on("messageDelete", (msgDelete) => {
  const LogChannels = client.channels.cache.get(config.logChannels);
  const logEmbed = new MessageEmbed()
    .setColor('RANDOM')
    .setAuthor({ name: 'Message Delete', iconURL: 'https://media1.giphy.com/media/YfA3Hwj9NBrkwdKRWp/giphy.gif?cid=6c09b9523iakbxdtqyj14fadwoqs3pba39s5n0x23o8gka7v&rid=giphy.gif&ct=s', url: '' })
    .setDescription(`Member **${msgDelete.author}** was delete a message from <#${msgDelete.channelId}>`)
    .setThumbnail(msgDelete.author.displayAvatarURL())
    .addFields(
      { name: 'Message content', value: msgDelete.content });
  LogChannels.send({ embeds: [logEmbed] })
  //LogChannels.send(`!USER DELETE MESSAGE \n **${msgDelete.author.username}** was delete from CH <#${msgDelete.channelId}> the message content : \n` + "```\n" + msgDelete.content + "\n```");
});
//event-handler
readdirSync('./src/events').forEach(async file => {
  const event = require(`./src/events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
})

//nodejs-events
process.on("unhandledRejection", e => {
  console.log(e)
})
process.on("uncaughtException", e => {
  console.log(e)
})
process.on("uncaughtExceptionMonitor", e => {
  console.log(e)
})
//

client.login(config.token)
