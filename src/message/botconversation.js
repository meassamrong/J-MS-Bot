const config = require("../config");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: config.OPEN_AI_API_KEY,
});
const openai = new OpenAIApi(configuration);
const resAsCode = config.codePreLeng;
const botConverSa = {
    async conversationBot(msgContent, msg) {

        const res = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: msgContent,
            temperature: 0.7,
            max_tokens: 800,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        })
        const result = res.data.choices[0].text;
        CheckRes(result, msg);
    }
}
function CheckRes(resResult,msg){
    if(resAsCode.some((word) => resResult.toLowerCase().includes(word))){
        msg.reply("```diff" + resResult + "```")
    }else {
        msg.reply(resResult)
    }
}
module.exports = botConverSa