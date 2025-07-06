module.exports.config = {
    name: "menu",
    version: "1.0.0",
    hasPermssion: 0,
    credits: "Your Name",
    description: "Displays the main shop menu.",
    commandCategory: "shop",
    cooldowns: 3,
    aliases: ["hi", "hello"]
};

module.exports.run = async function({ api, event, args }) {
    // Check for the special "welcome" flag from the listener
    const isWelcome = args[0] === 'welcome';
    
    const intro = isWelcome 
        ? "👋 Hello! Welcome to Xplicit Shop." 
        : "👋 Main Menu";
        
    const menuMessage = `${intro}\n\n🛒 You can:\n1️⃣ View Products\n2️⃣ Check Prices\n3️⃣ Place an Order\n4️⃣ Contact Admin\n\nPlease type the number of your choice or type 'menu' anytime to see this list again.`;
    
    api.sendMessage(menuMessage, event.threadID, event.messageID);
}
