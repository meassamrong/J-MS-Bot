const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("makeimage")
    .setDescription("Make an image from your type!")
    .addStringOption((option) =>  option.setName('prompt').setDescription('type something you want to make').setRequired(true)),
    run: async (client, interaction) => {
      interaction.reply(`Bot Latency's : ${client.ws.ping}`)
    }
 };
