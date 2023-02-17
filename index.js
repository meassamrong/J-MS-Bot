const { Client, Collection, Intents } = require("discord.js");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_BANS, Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS, Intents.FLAGS.GUILD_INTEGRATIONS, Intents.FLAGS.GUILD_WEBHOOKS, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS, Intents.FLAGS.GUILD_MESSAGE_TYPING, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.DIRECT_MESSAGE_REACTIONS, Intents.FLAGS.DIRECT_MESSAGE_TYPING, Intents.FLAGS.GUILD_SCHEDULED_EVENTS], partials: ["USER", "CHANNEL", "GUILD_MEMBER", "MESSAGE", "REACTION", "GUILD_SCHEDULED_EVENT"] });
const config = require("./src/config.js");
const { readdirSync } = require("fs")
const moment = require("moment");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
client.commands = new Collection()

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
    // console.log(`New Time ${postDelay}`)
  }, postDelay)
  //console.log(postDelay)
  //Synce Commands
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
    const conversation = require('./src/message/botconversation.js')
    // const memberMsgContent = memberMsgArgs.slice(1, memberMsgArgs.length).join(' ');
    const memberMessage = config.memberMessageAls;
    if (msg.author.bot) {
      return;
    } else {
      if (memberMessage.some((word) => msg.content.toLowerCase().includes(word))) {
        const AliasMessage = 'hello, how are you today?';
        conversation.conversationBot(AliasMessage, msg)
      } else {
        conversation.conversationBot(msg.content, msg)
      }
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
