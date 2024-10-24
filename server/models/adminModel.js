const db = require("../config/db");
const bcrypt = require("bcrypt");

// User model
const Admin = {
   getCustermer: () => {
    return new Promise((resolve, reject) => {
      const query = "call GetCustomerInfo()";
      db.query(query, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      }
      );
    }
    );
  },
  

  getDriver: () => {
    return new Promise((resolve, reject) => {
      const query = "call GetDriverInfo()";
      db.query(query, (err, result) => {
        if (err) {
          return reject(err);
        }
        resolve(result[0]);
      }
      );
    }
    );
},
 countCustomer: () => {
  return new Promise((resolve, reject) => {
    const query = "call CountCustomer()";
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0][0].total);
    }
    );
  }
  );
},

 countProduct: () => {
  return new Promise((resolve, reject) => {
    const query = "call CountProducts()";
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0][0].total);
    }
    );
  }
  );
},
 countEmployee: () => {
  return new Promise((resolve, reject) => {
    const query = "call GetTotalEmployee()";
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0][0].TotalRowCount);
    });
  }
  );
}

};


module.exports = Admin;



