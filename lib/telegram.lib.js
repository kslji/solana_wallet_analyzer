const { Telegraf } = require('telegraf');
const globlConfig = require("../global.config.json");

async function sendMessageWithChunks(influencer, message, bot = new Telegraf(globlConfig.TELEGRAM_API_BOT_TOKEN)) {
    try {
        // Split message into chunks of 5 tokens each
        const messageChunks = splitMessage(message, globlConfig.WALLET_BATCHES, influencer);

        // Send each chunk as a separate message
        for (const chunk of messageChunks) {
            await bot.telegram.sendMessage(globlConfig.CHANNEL_ID, chunk);
        }

        console.log(`All messages with chunks are sent successfully for ${influencer} ✅ !!`);
    } catch (error) {
        console.error(`Error sending message for ${influencer}:`, error);
    }
}

function splitMessage(message, tokensPerChunk, influencer) {
    // Extract token details
    const tokenLines = message.split('\n').filter(line => line.trim().startsWith('- Token:'));

    const chunks = [];
    for (let i = 0; i < tokenLines.length; i += tokensPerChunk) {
        const chunk = tokenLines.slice(i, i + tokensPerChunk).join('\n');
        chunks.push(chunk);
    }

    // Add header and footer to each chunk
    return chunks.map((chunk, index) => `
        🌟 **Influencer Wallet Update (Page : ${index + 1})** 🌟
        -----------------------------------
        🧑‍💼 **Influencer**: ${influencer}
        📊 **Holdings**:
        ${chunk}
    `);
}

async function sendMessage(influencer, message, bot = new Telegraf(globlConfig.TELEGRAM_API_BOT_TOKEN)) {
    try {
        await bot.telegram.sendMessage(globlConfig.CHANNEL_ID, message);
        console.log(`All messages sent successfully for ${influencer} ✅ !!`);
    } catch (error) {
        console.error(`Error sending message for ${influencer}:`, error);
    }
}

module.exports = {
    sendMessage: sendMessage,
    sendMessageWithChunks: sendMessageWithChunks,
};
