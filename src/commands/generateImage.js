const { MessageEmbed, Permissions } = require("discord.js");
const Discord = require('discord.js')
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require('../config.js')
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: config.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);
module.exports = {
  data: new SlashCommandBuilder()
    .setName("makeimage")
    .setDescription("Make an image from your type!")
    .addStringOption((option) => option.setName('prompt').setDescription('type something you want to make').setRequired(true)),
  run: async (client, interaction) => {
    const prompts = interaction.options.getString('prompt') ?? " ";
    const promptsReply = `${interaction.user} You're make image ` + "```" + `\n${prompts} ` + "```";
    await interaction.reply(promptsReply);
    const rendomStart = Math.floor(Math.random() * 45);
    const response = await openai.createImage({ prompt: prompts, n: 1, size: "1024x1024" });
    for (var i = rendomStart;  i < 101; i++) {
      await interaction.editReply(promptsReply + '\n' + `Processing Status ${i}%`);
    }
    if (i > 100) {
      interaction.editReply(promptsReply + '\n' + `Processing Status Ended !`);
      await interaction.followUp(response.data.data[0].url);
    }
  }
};
