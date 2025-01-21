# Solana Wallet Analyzer ✨🚀📈

This bot fetches all wallet tokens with a minimum value of $1000 (configurable in the code). Once all wallet prices are fetched and a message is sent to the Telegram channel, the bot will sleep for 5 hours (also configurable). After 5 hours, it resumes tracking wallet funds provided in the global JSON file.

## 🚀 Getting Started  

### Prerequisites 📖

Ensure you have Node.js installed on your system. If not, download and install it from [Node.js Official Website](https://nodejs.org/).  

---

### Installation ⌛  

1. **Clone this Repository:**  
   Clone the repository to your local system using the following command:  
   ```sh
   git clone https://github.com/kslji/crawler.git
   ```  

2. **Install Dependencies:**  
   Navigate to the project directory and install the required NPM packages:  
   ```sh
   npm install
   ```  

3. **Create a Configuration File:**  
   Create a configuration file in the project directory with the following parameters:  

   - **`SOLANA_RPC`**: An array of Solana RPC URLs.  
   - **`INFLUENCER_WALLETS`**: An object mapping wallet addresses to influencer names, e.g., `{ "address": "name" }`.  
   - **`JUP_PRICE_API`**: URL of the token price API (e.g., [Jupiter API](https://jup.ag/)).  
   - **`TELEGRAM_API_BOT_TOKEN`**: Bot token for your Telegram bot.  
   - **`CHANNEL_ID`**: The Telegram channel ID where the bot will send updates.  
   - **`PROGRAM_ID`**: The default Solana Program ID, typically `"TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"`.  

   Example configuration file:  
   ```json
   {
       "PROGRAM_ID": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
       "SOLANA_RPC": [
           "https://solana-mainnet.rpcpool.com",
           "https://api.mainnet-beta.solana.com"
       ],
       "INFLUENCER_WALLETS": {
           "ueibwviwuevibvuiewudv": "wallet1"
       },
       "JUP_PRICE_API": "https://quote-api.jup.ag/v4/price",
       "TELEGRAM_API_BOT_TOKEN": "YOUR_BOT_TOKEN_HERE",
       "CHANNEL_ID": "YOUR_CHANNEL_ID_HERE"
   }
   ```  

---

### Key Features 🚀  

- **Track Influencer Wallets:** Monitor activity on wallets associated with influencers.  
- **Fetch Real-Time Token Prices:** Leverage the Jupiter API or your chosen API for up-to-date token prices.  
- **Telegram Integration:** Automatically send wallet activity updates to a specified Telegram channel.  

---

### Notes 📝  

- Ensure your Telegram bot is added to the specified channel with appropriate permissions.  
- Choose a reliable Solana RPC endpoint for consistent performance.  
- Double-check the configuration file for accuracy before running the bot.  
