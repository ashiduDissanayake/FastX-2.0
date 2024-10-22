const db = require("../config/db");


const login = (username, password, callback) => {
    const query = 'CALL MainManagerLogin(?, ?)';
    db.query(query, [username, password], (err, result) => {
        if (err) {
            return callback(err, null);
        }
        callback(null, result);
    });
};

module.exports = { login };