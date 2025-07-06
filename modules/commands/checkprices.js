module.exports.config = {
    name: "checkprices",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your Name",
    description: "Shows the price list.",
    commandCategory: "shop",
    cooldowns: 3,
    aliases: ["check prices", "prices"]
};

module.exports.run = async function({ api, event }) {
    const pricesMessage = `💰 Price List:\n\n- Product A: $10\n- Product B: $20\n- Product C: $15\n\nType 'menu' to go back.`;
    api.sendMessage(pricesMessage, event.threadID, event.messageID);
}
