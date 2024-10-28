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
},
getAssistantDriver: () => {
  return new Promise((resolve, reject) => {
    const query = "call GetDriverAssistantInfo()";
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

getManager: () => {
  return new Promise((resolve, reject) => {
    const query = "call GetBranchManagerInfo()";
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

getOrderCount: () => {
  return new Promise((resolve, reject) => {
    const query = "call GetOrdersCount()";
    db.query(query, (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result[0][0].OrderCount);
    }
    );
  }
  );
},

deleteManager: (id) => {
  return new Promise((resolve, reject) => {
    const query = 
    `SET SQL_SAFE_UPDATES = 0;
    call deleteManager(?);
    SET SQL_SAFE_UPDATES = 1;`;
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
},

deleteDriver: (id) => {
  return new Promise((resolve, reject) => {
    const query = 
    `SET SQL_SAFE_UPDATES = 0;
    call deleteDriver(?);
    SET SQL_SAFE_UPDATES = 1;`;
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
},

deleteAssistantDriver: (id) => {
  return new Promise((resolve, reject) => {
    const query = 
    `
    call deleteAssistantDriver(?);
    `;
    db.query(query, [id], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
},

};


module.exports = Admin;



