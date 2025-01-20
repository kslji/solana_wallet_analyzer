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

module.exports = {
    sleep: sleep
}