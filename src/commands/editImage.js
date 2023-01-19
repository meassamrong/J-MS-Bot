const { MessageEmbed, Permissions } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");
const config = require("../config");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: config.OPEN_AI_API_KEY,
});
const sharp = require('sharp');
const https = require('https');
const fs = require("fs");
const openai = new OpenAIApi(configuration);
const imagePath = '/home/jcorpDev/bob-v2/images/asdasd.png'
const toStoreFile = "images/"
module.exports = {
  data: new SlashCommandBuilder()
    .setName("variaimage")
    .setDescription("variation your Image by AI caculating")
    .addStringOption((option) => option.setName('prompt').setDescription('your image link from discord link only').setRequired(true)),
  run: async (client, interaction) => {
    const prompts = interaction.options.getString('prompt') ?? " ";
    const imageName = interaction.user.username + Math.floor(Math.random() * 999);
    const imageStoreFiles = `${toStoreFile}/${imageName}.png`;
    downloadImage(prompts, imageStoreFiles);
    // try {
    //   const response = await openai.createImageVariation(
    //     fs.createReadStream(imagePath),
    //     1,
    //     "1024x1024"
    //   );
    //   console.log(response.data.data[0].url);
    // } catch (error) {
    //   if (error.response) {
    //     console.log(error.response.status);
    //     console.log(error.response.data);
    //   } else {
    //     console.log(error.message);
    //   }
    // }
    //   interaction.reply(`Bot Latency's : ${client.ws.ping}`)


    // convert file size
    function downloadImage(url, filepath) {
      https.get(url, async (response) => {
        response.pipe(fs.createWriteStream(filepath));
        // compressImage(`/home/jcorpDev/bob-v2/images/${imageName}.png`)
        if(filepath == filepath) {
          await setTimeout(() => {
            compressImage(`/home/jcorpDev/bob-v2/images/${imageName}.png`)
            console.log(`${toStoreFile}/upload/${imageName}.png`)
          }, 2500)
        }
      })
    }
    function compressImage(imageStoreFiles) {
      sharp(imageStoreFiles)
        .resize(1024, 1024)
        .toFile(`${toStoreFile}/upload/${imageName}.png`)
        .then(data => {
          console.log("succ", data)
        })
        .catch(err => {

          console.log(err)

        });
    }
  }
};
