module.exports.config = {
    name: "contactadmin",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your Name",
    description: "Provides admin contact information.",
    commandCategory: "shop",
    cooldowns: 3,
    aliases: ["contact admin", "admin"]
};

module.exports.run = async function({ api, event }) {
    const adminID = require("../../config.json").ADMINBOT[0];
    if (!adminID) {
        return api.sendMessage("Admin ID is not set in the config file.", event.threadID, event.messageID);
    }
    
    // Using mentions to create a clickable link to the admin's profile
    const adminMessage = {
        body: "📞 You can contact the admin directly by clicking here -> Admin",
        mentions: [{
            tag: "Admin",
            id: adminID
        }]
    };
    
    api.sendMessage(adminMessage, event.threadID, event.messageID);
}
