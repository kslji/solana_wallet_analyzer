const { Connection } = require("@solana/web3.js");
const poolLib = require("../lib/solana/pool.lib");
const priceLib = require("../lib/solana/price.lib");
const telegramLib = require("../lib/telegram.lib");
const helperUtil = require("../util/helper.util");
const globalConfig = require("../global.config.json");

const MIN_TOKEN_QUANTITY = 10;
const MIN_USD_VALUE = 1000;
const WALLET_BATCH_PROCESS = 5;
const BATCH_SLEEP = 60000;
const FULL_WALLET_SLEEP = 600000;


(async () => {
    try {
        while (true) {
            let iterRpcCalls = 0, connection = null;

            for (let wallet in globalConfig.INFLUENCER_WALLETS) {

                // Sleep between batches
                if (iterRpcCalls % WALLET_BATCH_PROCESS === 0 && iterRpcCalls > 0) {
                    console.log(`Processed ${WALLET_BATCH_PROCESS} wallets. Sleeping for ${BATCH_SLEEP} ms...`);
                    await helperUtil.sleep(BATCH_SLEEP);
                }

                // Sleep after processing all wallets
                if (iterRpcCalls > 0 && iterRpcCalls % Object.keys(globalConfig.INFLUENCER_WALLETS).length === 0) {
                    console.log(`Processed all wallets. Sleeping for ${FULL_WALLET_SLEEP} ms...`);
                    await helperUtil.sleep(FULL_WALLET_SLEEP);
                }

                try {
                    connection = new Connection(globalConfig.SOLANA_RPC[iterRpcCalls % globalConfig.SOLANA_RPC.length], 'confirmed');
                } catch (e) {
                    console.log(e)
                    continue;
                }

                const totalToken = await poolLib.getAllTokenBalancesForWallet(wallet, connection);
                const filterTokenBalance = totalToken.filter(token => token.balance > MIN_TOKEN_QUANTITY);
                const fetchTokens = filterTokenBalance.map(token => token.tokenMintAddress);
                const fetchTokenPrices = await priceLib.getTokensPrice(fetchTokens);

                let tokenArr = [];

                filterTokenBalance.forEach((item) => {
                    const tokenPrice = fetchTokenPrices.get(item.tokenMintAddress);
                    const tokenValue = item.balance * tokenPrice;
                    if (tokenValue > MIN_USD_VALUE) {
                        tokenArr[item.tokenMintAddress] = tokenValue;
                    }
                });

                const tokenDetails = Object.entries(tokenArr)
                    .map(
                        ([tokenAddress, value]) =>
                            `\n - Token: ${tokenAddress} - $${value} USD`
                    )
                    .join('\n');

                await telegramLib.sendMessage(
                    wallet,
                    `
            🌟 **Influencer Wallet Update (${filterTokenBalance.length})** 🌟
            -----------------------------------
            🧑‍💼 **Influencer**: ${globalConfig.INFLUENCER_WALLETS[wallet]}
            📊 **Holdings**:
            ${tokenDetails}
                `
                );

                iterRpcCalls++;
            }
        }
    } catch (e) {
        throw e
    }
})();

