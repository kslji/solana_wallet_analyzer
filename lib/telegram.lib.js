const { Telegraf } = require('telegraf');
const globlConfig = require("../global.config.json");


async function sendMessage(influencer, msg, bot = new Telegraf(globlConfig.TELEGRAM_API_BOT_TOKEN)) {
    try {
        await bot.telegram.sendMessage(globlConfig.CHANNEL_ID, msg);
        console.log(`Message sent successfully for ${influencer}✅ !!`)
    } catch (error) {
        throw error
    }
}

function splitMessage(message, maxLength) {
    const chunks = [];
    for (let i = 0; i < message.length; i += maxLength) {
        chunks.push(message.substring(i, i + maxLength));
    }
    return chunks;
}
module.exports = {
    sendMessage: sendMessage
}
