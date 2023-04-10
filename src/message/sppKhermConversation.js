const config = require("../config");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: config.OPEN_AI_API_KEY,
});
const sppKhmerConversation = {
    async conversationBot(msg) {
        const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msg.content,
            temperature: 1,
            max_tokens: 800,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.5,
        })
        const result = res.data.choices[0].text;
        CheckRes(result, msg);
    }
}
async function CheckRes(resResult, msg) {
    const AiRes = resResult;
    const arrayMessageRes = AiRes.split(" ");
    const newArrayMessageRes = [];
    const messageResply = await msg.reply('You question on process.....!');
    for (let i = 0; i < arrayMessageRes.length; i++) {
        setTimeout(() => {
            newArrayMessageRes.push(arrayMessageRes[i]);
        }, i * 100);
        setTimeout(async () => {
            await messageResply.edit(newArrayMessageRes.join(' ').toString(' '))
        }, i * 400);
    }
}
module.exports = sppKhmerConversation;