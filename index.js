const { spawn } = require("child_process");
const chalk = require("chalk");
const express = require('express');

// --- 1. WEB SERVER SETUP ---
const app = express();
const port = process.env.PORT || 3000; // Use Render's port or 3000 for local testing

// This creates a simple webpage to prove the server is alive.
app.get('/', (req, res) => {
  res.send('Xplicit Shop Bot is alive!');
});

// Start the web server.
app.listen(port, () => {
  console.log(chalk.green(`Web server listening on port ${port}`));
  console.log(chalk.blue('Starting the bot process now...'));
  
  // --- 2. START THE BOT AFTER THE SERVER IS RUNNING ---
  startBot();
});

// --- 3. BOT PROCESS LAUNCHER (This part is the same as before) ---
function startBot() {
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (code) => {
        if (code !== 0) {
            console.error(chalk.red(`Bot process crashed with exit code ${code}. Restarting in 5 seconds...`));
            setTimeout(startBot, 5000);
        } else {
            console.log(chalk.yellow('Bot process exited cleanly. Not restarting.'));
        }
    });

    child.on("error", (error) => {
        console.error(chalk.red(`An error occurred with the bot process: ${error}`));
    });
}
