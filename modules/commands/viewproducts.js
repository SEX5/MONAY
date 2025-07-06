module.exports.config = {
    name: "viewproducts",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your Name",
    description: "Lists the available products.",
    commandCategory: "shop",
    cooldowns: 3,
    aliases: ["view products"]
};

module.exports.run = async function({ api, event }) {
    const productsMessage = `Here are our available products:\n\n🔹 Product A - A great product for all your needs.\n🔹 Product B - High quality and durable.\n🔹 Product C - The best value on the market.\n\nType 'menu' to go back.`;
    api.sendMessage(productsMessage, event.threadID, event.messageID);
}
