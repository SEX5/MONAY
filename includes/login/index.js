const login = require("fca-unofficial");

// This file's only job is to export the login function from the library.
// All the extra code from the template has been removed.
module.exports = function(loginData, callback) {
    return login(loginData, callback);
};
