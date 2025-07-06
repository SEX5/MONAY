module.exports.config = {
    name: "placeorder",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your Name",
    description: "Provides instructions on how to place an order.",
    commandCategory: "shop",
    cooldowns: 3,
    aliases: ["place an order", "order"]
};

module.exports.run = async function({ api, event }) {
    const orderMessage = `📝 To place an order, please send us the following details in one message:\n\n- Product Name(s) & Quantity\n- Your Full Name\n- Shipping Address\n- Payment Method (e.g., GCash)\n\nAfter sending your details, please send a screenshot of your payment with the GCash reference number.\n\nWe will confirm your order shortly!`;
    api.sendMessage(orderMessage, event.threadID, event.messageID);
}
