const chalk = require('chalk');

// A simple logger using basic colors
function log(message, type) {
  const logType = type ? type.toUpperCase() : 'LOG';
  
  let coloredType;
  switch(logType) {
    case 'ERROR':
      coloredType = chalk.red(`[${logType}]`);
      break;
    case 'LOADED':
    case 'COMMAND':
    case 'SYSTEM':
      coloredType = chalk.green(`[${logType}]`);
      break;
    case 'LOGIN':
    case 'UPDATE':
      coloredType = chalk.blue(`[${logType}]`);
      break;
    default:
      coloredType = chalk.cyan(`[${logType}]`);
  }
  
  console.log(coloredType, message);
}

// Export the functions so other files can use them
module.exports = log;
module.exports.log = log;
module.exports.loader = log; // Make loader an alias for our simple logger

// This function is what's causing the crash.
// We will keep it but make it do nothing, so it doesn't break other files that try to call it.
module.exports.getThemeColors = function() {
    return {};
}
