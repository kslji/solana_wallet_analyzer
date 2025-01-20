const axios = require("axios")
const globalConfig = require("../../global.config.json")

async function getTokensPrice(tokens) {
    try {
        let tokenPrices = new Map();
        const batchSize = 20;

        for (let i = 0; i < tokens.length; i += batchSize) {
            const batch = tokens.slice(i, i + batchSize);
            await processBatch(batch, tokenPrices);
        }

        return tokenPrices;
    } catch (e) {
        throw e;
    }
}

async function processBatch(batch, tokenPrices) {
    const tokensString = batch.join(", ");
    const response = await axios.get(`${globalConfig.JUP_PRICE_API}${tokensString}`);

    for (let token in response.data.data) {
        const price = response.data.data[token] ? response.data.data[token].price : 0;
        tokenPrices.set(token, price);
    }
}


module.exports = {
    getTokensPrice: getTokensPrice
}