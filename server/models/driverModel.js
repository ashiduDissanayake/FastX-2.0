const db = require("../config/db");

const DriverModel = {
    login: (username, password, callback) => {

        
        const query = 'CALL DriverLogin(?, ?)';
        db.query(query, [username, password], (err, result) => {
          if (err) {
            
            return callback(err, null);
          }
          
          callback(null, result);
        });
      },
};

module.exports = DriverModel;