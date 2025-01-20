const { PublicKey } = require('@solana/web3.js');
const _ = require("lodash")
const globalConfig = require("../../global.config.json")

async function getAllTokenBalancesForWallet(walletAddress, connection) {
    try {
        // Validate the wallet address
        if (_.isEmpty(walletAddress) && _.isEmpty(connection)) {
            throw new Error(`Missing argument! walletAddress: ${walletAddress} or connection : ${connection}`);
        }

        walletAddress = new PublicKey(walletAddress);

        // Fetch all token accounts for the wallet
        const tokenAccounts = await connection.getParsedTokenAccountsByOwner(walletAddress, {
            programId: new PublicKey(globalConfig.PROGRAM_ID),
        });

        if (_.isEmpty(tokenAccounts.value)) {
            console.log('No tokens found for the wallet.');
            return [];
        }

        // Extract and return token balances
        const balances = tokenAccounts.value.map((accountInfo) => {
            const { mint, tokenAmount } = accountInfo.account.data.parsed.info;
            return {
                tokenMintAddress: mint,
                balance: tokenAmount.uiAmount,
            };
        });

        return balances;
    } catch (error) {
        throw error
    }
}

module.exports = {
    getAllTokenBalancesForWallet: getAllTokenBalancesForWallet
}


