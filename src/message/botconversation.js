const config = require("../config");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: config.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const botConverSa = {
    async conversationBot(msgContent, msg){
        const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msgContent,
            temperature: 0.9,
            max_tokens: 200,    
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0.6,
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
        // const randomTimeEdit = Math.floor(Math.random() * 150);
        setTimeout(() => {
            newArrayMessageRes.push(arrayMessageRes[i]);
        }, i * 100);
        //send message as fake write to text channel      
        setTimeout(async () => {
            // console.log(`message length ${arrayMessageRes.length} || count I ${i += 1}`);
         await messageResply.edit(newArrayMessageRes.join(' ').toString(' '))
        }, i * 400);
    }
}
module.exports = botConverSa