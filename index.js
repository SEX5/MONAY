const { spawn } = require("child_process");
const chalk = require("chalk");

console.log(chalk.bold.cyan('Starting Xplicit Shop Bot...'));

function startBot() {
    // This function starts the main.js file as a child process.
    // The reason templates do this is to automatically restart the bot if it crashes.
    const child = spawn("node", ["--trace-warnings", "--async-stack-traces", "main.js"], {
        cwd: __dirname,
        stdio: "inherit",
        shell: true
    });

    child.on("close", (code) => {
        if (code !== 0) {
            console.error(chalk.red(`Bot process crashed with exit code ${code}. Restarting in 5 seconds...`));
            setTimeout(startBot, 5000);
        }
    });

    child.on("error", (error) => {
        console.error(chalk.red(`An error occurred with the bot process: ${error}`));
    });
}

// Initial start of the bot
startBot();
