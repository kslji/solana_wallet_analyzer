const fs = require("fs");
const path = require("path");

async function sleep(duration) {
    try {
        if (duration === null) {
            throw new Error("Please specify the sleep duration!")
        }
        await new Promise((resolve) => setTimeout(resolve, duration))
    } catch (error) {
        throw error
    }
}

function getNewInvestment(storeData, wallet) {
    try {
        const filePath = path.join(__dirname, `../storage/${wallet}.json`);

        let existingData = [];

        if (fs.existsSync(filePath)) {
            const data = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(data);
        }
        return storeData.filter((item) => !existingData.includes(item));
    } catch (err) {
        console.error(`Error reading file: ${err.message}`);
    }
}
module.exports = {
    sleep: sleep,
    getNewInvestment: getNewInvestment
}