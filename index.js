const { spawn } = require("child_process");
const express = require("express");
const chalk = require("chalk");

// --- 1. SETUP THE WEB SERVER FOR RENDER ---
const app = express();
const port = process.env.PORT || 3000; // Render provides the port to use in process.env.PORT

// This is the "health check" endpoint. Render pings this to know that your app is alive.
app.get('/', (req, res) => {
  res.send('Xplicit Shop Bot is alive and running!');
});

app.listen(port, () => {
  console.log(chalk.green(`✅ Web server is listening on port ${port}.`));
});

// --- 2. START THE BOT PROCESS ---
function startBot() {
    console.log(chalk.bold.cyan('Starting bot process (main.js)...'));

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
            console.log(chalk.green('Bot process exited cleanly.'));
        }
    });

    child.on("error", (error) => {
        console.error(chalk.red(`An error occurred with the bot process: ${error}`));
    });
}

// Start the bot
startBot();
