const fs = require("fs-extra");
const path = require('path');
const chalk = require("chalk");
const login = require('./includes/login'); // Assumes this is where the login logic is
const logger = require("./utils/log.js");

console.log(chalk.bold.blue('Xplicit Shop Bot - Main Process'));
logger.log('Initializing...', "SYSTEM");

// Load config file
const config = require("./config.json");

// Define a central client object to hold data
const client = {
  commands: new Map(),
  cooldowns: new Map(),
  api: null,
  config: config
};

// --- Login to Facebook ---
function startBot() {
  const appStatePath = path.join(__dirname, config.APPSTATEPATH);
  
  if (!fs.existsSync(appStatePath)) {
    return logger.loader("`appstate.json` file not found. Please create it and add your appstate.", "error");
  }

  const appState = require(appStatePath);
  const loginData = { appState: appState };

  login(loginData, (err, api) => {
    if (err) {
      console.error(chalk.red("LOGIN FAILED:"), err);
      if (err.error === 'Not logged in') {
        logger.log("Account is checkpointed. Please log in with a browser to fix.", 'CHECKPOINT');
      }
      return process.exit(1);
    }
    
    // --- Login Successful ---
    client.api = api;
    api.setOptions(config.FCAOption);
    fs.writeFileSync(appStatePath, JSON.stringify(api.getAppState(), null, 2));
    logger.log(`Logged in as ${api.getCurrentUserID()}`, "LOGIN");

    // --- Load Commands ---
    const commandsPath = path.join(__dirname, 'modules/commands');
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
    
    console.log(chalk.yellow('\n── LOADING SHOP COMMANDS ─●'));
    for (const file of commandFiles) {
      try {
        const command = require(path.join(commandsPath, file));
        if (command.config && command.config.name) {
          client.commands.set(command.config.name, command);
          if (command.config.aliases && Array.isArray(command.config.aliases)) {
            command.config.aliases.forEach(alias => client.commands.set(alias, command));
          }
          logger.log(`Loaded command: ${command.config.name}`, "COMMAND");
        } else {
          logger.loader(`File ${file} is not a valid command file.`, "error");
        }
      } catch (error) {
        logger.loader(`Could not load command from ${file}: ${error.message}`, "error");
      }
    }
    logger.log(`Loaded a total of ${client.commands.size} command triggers.`, "SYSTEM");

    // --- Start Listening for Messages ---
    const listener = require('./includes/listen')({ 
        api: client.api, 
        commands: client.commands,
        config: client.config 
    });

    api.listenMqtt((err, event) => {
        if(err) {
            console.error(chalk.red("Listen Error:"), err);
            // Handle common listen errors like logout
            if (err.error === 'Not logged in.') {
                logger.log("Bot account was logged out.", 'LOGIN');
                return process.exit(1);
            }
            return;
        }
        // Pass the event to the listener function
        listener(event);
    });
  });
}

// Start the bot process
startBot();
