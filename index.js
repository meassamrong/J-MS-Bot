const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ 
  intents: 32767,
});
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
client.commands = new Collection()
const { joinVoiceChannel,getVoiceConnection } = require('@discordjs/voice');
const rest = new REST({ version: '9' }).setToken(config.token);

const log = l => { console.log(`[${moment().format("DD-MM-YYYY HH:mm:ss")}] ${l}`) };

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
  if (msg.channel.id == config.conversationChannels){
    const codePreLeng = config.codePreLeng;
    const requestAsCode = codePreLeng.some((word) => msg.content.toLowerCase().includes(word))
    if(msg.author.bot) {return false} ;
    if(!requestAsCode){
      //response as coversation
         const conversation = require('./src/message/botconversation.js')
      conversation.conversationBot(msg)
      
    }else{
      //response as cod
      const botResponASCode = require('./src/message/botrespondsascode.js')
      botResponASCode.resondindAscode(msg)
    }
}

  //Simsimi Random reply member message
  if (msg.channel.id == config.chatCh) {
    const simsiApi = require('./src/message/simsimiap.js')
    const chatCh = client.channels.cache.get(config.chatCh);
    const randomReplyMessage = Math.floor(Math.random() * 1200);
    if (msg.author.bot) {
      return;
    } else {
      console.log(randomReplyMessage)
      //msg.reply(`message random as ${randomReplyMessage} of 1000 \n bot will respond more 1000 of value`)
      if (randomReplyMessage > 1000) {
        simsiApi.randomReplyMessage(msg.content, msg)
      }
    }
  }
})

client.on('voiceStateUpdate', async (oldState, newState) => {
  const CreateTemporaryVoiceChennels = require("./temporaryChannels.js")
  const AllowCreateTemporary  = config.allowCreateTemporaryCHformember;
  if(AllowCreateTemporary){
    await CreateTemporaryVoiceChennels.CreateVoiceChannelsTem(oldState, newState)
  }
})
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
