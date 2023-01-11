const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Check AI Latency!"),
    run: async (client, interaction) => {
      interaction.reply(`Bot Latency's : ${client.ws.ping}`)
    }
 };
