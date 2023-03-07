const config = require("../config");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: config.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const codePreLeng = config.codePreLeng;
const openaiConfig = {

}
const botRepAscode = {
    async resondindAscode(msg) {
        const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msg.content,
            temperature: 0.5,
            max_tokens: 400,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0.5,
        })
        const result = res.data.choices[0].text
        //const result = "lorem lorem lorem lorem lorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem loremlorem lorem lorem lorem"
        checkRes(msg.content.toLowerCase(), codePreLeng, result, msg)
    }
}
// check user messages code
async function checkRes(userMessage, words, result, msg) {
    const codeLengType = [];
    words.forEach(word => {
        if (userMessage.includes(word)) {
            codeLengType.push(word);
        }
    });
    const codeType = codeLengType[0]
    const AiRes = result;
    const arrayMessageRes = AiRes.split(" ");
    const newArrayMessageRes = [];
    const messageResply = await msg.reply('You question on process.....!');
    for (let i = 0; i < arrayMessageRes.length; i++) {
        setTimeout(() => {
            newArrayMessageRes.push(arrayMessageRes[i]);
        }, i * 100);
        setTimeout(async () => {
            await messageResply.edit("```" + codeType + "\n" + newArrayMessageRes.join(' ').toString(' ') + "```");
        }, i * 400);
    }
}
module.exports = botRepAscode;