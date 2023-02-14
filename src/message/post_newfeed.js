const Anime_Images = require('anime-images-api');
const { MessageEmbed } = require('discord.js')
const request = require('request');
const postNewsFeed = {
    postNewsFeed(channel) {
        randomImage(channel);
    }
}

//request pickup from http 
async function randomImage(channel) {
    let apiResponse ;
    request('https://vinuxd.vercel.app/api/pickup', (error, response, body) => {
        if (!error && response.statusCode === 200) {
            apiResponse = JSON.parse(body).pickup;
        }
    });
    //Randome App Icon 
    const config = require('../config.js')
    const AppRandomNumber = Math.floor(Math.random() * config.socialName.length);
    //console.log(`name : ${config.socialNameIcon[AppRandomNumber]} || Url ${config.socialNameIcon[AppRandomNumber+1]}`)

    //send random image and random type
    const API = new Anime_Images();
    const imagesFuncArr = ["hug()", "kiss()", "slap()", "punch()", "punch()", "pat()", "kill()", "cuddle()"]
    const randomNumberOfImage = Math.floor(Math.random() * imagesFuncArr.length);
    if (randomNumberOfImage == 0) {
        let { image } = await API.sfw.hug();
        const messageEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(apiResponse)
            .setAuthor({ name: `${config.socialName[AppRandomNumber]}`, iconURL: `${config.socialIcon[AppRandomNumber]}`, url: image })
            .setImage(image)
            .setFooter({ text: "This Image and quotes is random from internet || © J'Corp#5228", iconURL: image });
            channel.send({ embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react("👍")
                embedMessage.react("❤️")
                embedMessage.react("😂")
                embedMessage.react("😥")
                embedMessage.react("😡")
            });
         
    } else if (randomNumberOfImage == 1) {
        let { image } = await API.sfw.kiss();
        const messageEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(apiResponse)
            .setAuthor({ name: `${config.socialName[AppRandomNumber]}`, iconURL: `${config.socialIcon[AppRandomNumber]}`, url: image })
            .setImage(image)
            .setFooter({ text: "This Image and quotes is random from internet || © J'Corp#5228", iconURL: image });
            channel.send({ embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react("👍")
                embedMessage.react("❤️")
                embedMessage.react("😂")
                embedMessage.react("😥")
                embedMessage.react("😡")
            });
         
    } else if (randomNumberOfImage == 2) {
        let { image } = await API.sfw.slap();
        const messageEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(apiResponse)
            .setAuthor({ name: `${config.socialName[AppRandomNumber]}`, iconURL: `${config.socialIcon[AppRandomNumber]}`, url: image })
            .setImage(image)
            .setFooter({ text: "This Image and quotes is random from internet || © J'Corp#5228", iconURL: image });
            channel.send({ embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react("👍")
                embedMessage.react("❤️")
                embedMessage.react("😂")
                embedMessage.react("😥")
                embedMessage.react("😡")
            });
         
    } else if (randomNumberOfImage == 3) {
        let { image } = await API.sfw.punch();
        const messageEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(apiResponse)
            .setAuthor({ name: `${config.socialName[AppRandomNumber]}`, iconURL: `${config.socialIcon[AppRandomNumber]}`, url: image })
            .setImage(image)
            .setFooter({ text: "This Image and quotes is random from internet || © J'Corp#5228", iconURL: image });
            channel.send({ embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react("👍")
                embedMessage.react("❤️")
                embedMessage.react("😂")
                embedMessage.react("😥")
                embedMessage.react("😡")
            });
         
    } else if (randomNumberOfImage == 4) {
        let { image } = await API.sfw.pat();
        const messageEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(apiResponse)
            .setAuthor({ name: `${config.socialName[AppRandomNumber]}`, iconURL: `${config.socialIcon[AppRandomNumber]}`, url: image })
            .setImage(image)
            .setFooter({ text: "This Image and quotes is random from internet || © J'Corp#5228", iconURL: image });
            channel.send({ embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react("👍")
                embedMessage.react("❤️")
                embedMessage.react("😂")
                embedMessage.react("😥")
                embedMessage.react("😡")
            });
         
    } else if (randomNumberOfImage == 5) {
        let { image } = await API.sfw.kill();
        const messageEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(apiResponse)
            .setAuthor({ name: `${config.socialName[AppRandomNumber]}`, iconURL: `${config.socialIcon[AppRandomNumber]}`, url: image })
            .setImage(image)
            .setFooter({ text: "This Image and quotes is random from internet || © J'Corp#5228", iconURL: image });
            channel.send({ embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react("👍")
                embedMessage.react("❤️")
                embedMessage.react("😂")
                embedMessage.react("😥")
                embedMessage.react("😡")
            });
         
    } else {
        let { image } = await API.sfw.cuddle();
        const messageEmbed = new MessageEmbed()
            .setColor("RANDOM")
            .setTitle(apiResponse)
            .setAuthor({ name: `${config.socialName[AppRandomNumber]}`, iconURL: `${config.socialIcon[AppRandomNumber]}`, url: image })
            .setImage(image)
            .setFooter({ text: "This Image and quotes is random from internet || © J'Corp#5228", iconURL: image });
            channel.send({ embeds: [messageEmbed]}).then(embedMessage => {
                embedMessage.react("👍")
                embedMessage.react("❤️")
                embedMessage.react("😂")
                embedMessage.react("😥")
                embedMessage.react("😡")
            });
         
    }


}
module.exports = postNewsFeed