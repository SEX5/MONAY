// This function is exported and will be called by main.js
// It receives the 'client' object which contains the api, commands, and config
module.exports = function (client) {

  // The 'firstTimeUsers' set will keep track of who has messaged the bot for the first time
  // This allows us to send a detailed welcome message only once.
  const firstTimeUsers = new Set();

  // This is the main function that will be executed for every event from Facebook
  return function (event) {
    // We only care about new messages, not other events like 'seen' or 'typing'
    if (event.type !== "message" && event.type !== "message_reply") return;
    
    // Ignore messages from group chats
    if (event.isGroup) return;

    // Ignore messages that don't have a body (e.g., just an attachment or a like)
    if (!event.body) return;

    // Ignore messages sent by the bot itself to prevent loops
    if (event.senderID === client.api.getCurrentUserID()) return;

    const senderID = event.senderID;
    const message = event.body.toLowerCase().trim();

    // --- WELCOME MESSAGE LOGIC ---
    // Check if we've seen this user before in this session
    if (!firstTimeUsers.has(senderID)) {
        const welcomeCommand = client.commands.get('menu');
        if (welcomeCommand && welcomeCommand.run) {
            // We use 'args: ["welcome"]' as a special flag to tell the menu command
            // that this is a first-time user.
            welcomeCommand.run({ api: client.api, event: event, args: ["welcome"] });
        }
        // Add the user to the set so they don't get the welcome message again
        firstTimeUsers.add(senderID);
        return; // Stop processing so only the welcome message is sent
    }

    // --- COMMAND HANDLING LOGIC ---
    let commandToRun;
    let userArgs = message.split(' ');
    let commandName = userArgs.shift(); // The first word is the command name

    // Map number inputs to command names for easy navigation
    const commandMap = {
        '1': 'viewproducts',
        '2': 'checkprices',
        '3': 'placeorder',
        '4': 'contactadmin'
    };

    if (commandMap[commandName]) {
        commandName = commandMap[commandName];
    }
    
    // Find the command in our command map
    commandToRun = client.commands.get(commandName);

    // If a command was found, execute it
    if (commandToRun && commandToRun.run) {
        try {
            // The 'run' function in each command file will be executed
            commandToRun.run({ 
                api: client.api, 
                event: event, 
                args: userArgs // Pass the rest of the message as arguments
            });
        } catch (error) {
            console.error("Error executing command:", commandName, error);
            client.api.sendMessage("❌ Oops! Something went wrong with that command.", event.threadID);
        }
    } 
    // --- FALLBACK REPLY ---
    else {
        // If the user types something we don't recognize, send a help message
        // (but don't respond to simple greetings that might have been missed)
        if (commandName !== 'hi' && commandName !== 'hello') {
            client.api.sendMessage("❓ Sorry, I didn’t understand that.\nPlease type ‘menu’ to see the list of options.", event.threadID);
        }
    }
  };
};
