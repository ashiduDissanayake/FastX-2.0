const db = require("../config/db");
const bcrypt = require("bcrypt");

const Manager = {


login :(username, password, callback) => {
  const query = 'CALL ManagerLogin(?, ?)';
  db.query(query, [username, password], (err, result) => {
      if (err) {
          return callback(err, null);
      }
      callback(null, result);
  });
},


  getActiveTripsByStore: (storeID) => {
    return new Promise((resolve, reject) => {
      const query = "CALL GetActiveTripsByStore(?)"; 
      db.query(query, [storeID], (err, result) => {
        if (err) {
          reject(err); 
        } else {
          const response = result[0]; 
          if (response[0] && response[0].error_message) {
            reject(new Error(response[0].error_message));
          } else {
            resolve(response); 
          }
        }
      });
    });
  },

  getFinishedTripsByStore: (storeID) => {
    return new Promise((resolve, reject) => {
        const query = "CALL GetFinishedTripsByStore(?);"; 
        db.query(query, [storeID], (err, result) => {
            if (err) {
                reject(err);
            } else {
                const response = result[0];
                if (response.length > 0 && response[0].error_message) {
                    reject(new Error(response[0].error_message));
                } else {
                    resolve(response);
                }
            }
        });
    });
},
    getStoreIDByManagerID: (managerID) => {
      return new Promise((resolve, reject) => {
          const query = "CALL GetStoreIDByManagerID(?);";
  
          db.query(query, [managerID], (err, result) => {
              if (err) {
                  return reject(err);
              }
  
              // Validate if a result was returned and extract the storeID
              if (result && result[0].length > 0) {
                  const storeID = result[0][0].store_ID; // Use correct key
                  return resolve({ store_ID: storeID });
              }
  
              return resolve(null); // No storeID found
          });
      });
  },  
   
    getTrainOrdersByStore: (storeID) => {
        return new Promise((resolve, reject) => {
          const query = "CALL GetTrainOrdersByStore(?)"; 
          db.query(query, [storeID], (err, result) => {
            if (err) {
              reject(err); 
            } else {
              const response = result[0]; 
              if (response[0] && response[0].error_message) {
                reject(new Error(response[0].error_message));
              } else {
                resolve(response); 
              }
            }
          });
        });
      },

      getAllStores: () => {
        return new Promise((resolve, reject) => {
          const query = "CALL GetAllStores()"; 
          db.query(query, (error, result) => {
            if (error) {
              reject(error);
            } else {
              const response = result[0]; 
              if (response[0] && response[0].error_message) {
                reject(new Error(response[0].error_message));
              } else {
                resolve(response); 
              }
            }
          });
        });
      },

      getStoreOrders: (storeId) => {
        return new Promise((resolve, reject) => {
          const query = "CALL GetStoreOrdersByStore(?)"; 
          db.query(query, [storeId], (error, result) => {
            if (error) {
              reject(error); 
            } else {
              const response = result[0]; 
              if (response[0] && response[0].error_message) {
                reject(new Error(response[0].error_message));
              } else {
                resolve(response);
              }
            }
          });
        });
      },

      getDriversByStore: (storeId) => {
        return new Promise((resolve, reject) => {
          const query = "CALL GetDriversByStoreID(?)"; 
          db.query(query, [storeId], (error, result) => {
            if (error) {
              reject(error); 
            } else {
              const response = result[0]; 
              if (response[0] && response[0].error_message) {
                reject(new Error(response[0].error_message));
              } else {
                resolve(response);
              }
            }
          });
        });
      },

      getDriverAssistantsByStore: (storeId) => {
        return new Promise((resolve, reject) => {
          const query = "CALL GetDriverAssistantsByStoreID(?)"; 
          db.query(query, [storeId], (error, result) => {
            if (error) {
              reject(error); 
            } else {
              const response = result[0]; 
              if (response[0] && response[0].error_message) {
                reject(new Error(response[0].error_message));
              } else {
                resolve(response); 
              }
            }
          });
        });
      },

      getTrucksByStore: (storeId) => {
        return new Promise((resolve, reject) => {
          const query = "CALL GetTrucksByStoreID(?)"; 
          db.query(query, [storeId], (error, result) => {
            if (error) {
              reject(error); 
            } else {
              const response = result[0]; 
              if (response[0] && response[0].error_message) {
                reject(new Error(response[0].error_message));
              } else {
                resolve(response); 
              }
            }
          });
        });
      },

      getRoutesByStore: (storeId) => {
        return new Promise((resolve, reject) => {
          const query = "CALL GetRoutesByStoreID(?)"; 
          db.query(query, [storeId], (error, result) => {
            if (error) {
              reject(error);
            } else {
              const response = result[0]; 
              if (response[0] && response[0].error_message) {
                reject(new Error(response[0].error_message));
              } else {
                resolve(response);
              }
            }
          });
        });
      },

      updateOrdersToBranch: (storeID) => {
        return new Promise((resolve, reject) => {
          const query = "CALL UpdateOrdersToBranchByStoreID(?)"; 
          db.query(query, [storeID], (error, result) => {
            if (error) {
              reject(error);
            } else {              
              if (!result[0] || (result[0][0] && result[0][0].error_message)) {
                reject(new Error(result[0] ? result[0][0].error_message : "Unknown error occurred"));
              } else {
                resolve({ success_message: "Orders updated successfully." }); 
              }
            }
          });
        });
      },

      endTripById: (scheduleID) => {
        return new Promise((resolve, reject) => {
          const query = "CALL EndTripByID(?)"; 
          db.query(query, [scheduleID], (error, result) => {
            if (error) {
              return reject(error); 
            }
            
            if (result[0] && result[0][0]) {
              const message = result[0][0].error_message || result[0][0].success_message;
              if (result[0][0].error_message) {
                return reject(new Error(message)); 
              }
              return resolve({ message }); 
            }
            
            reject(new Error("Unexpected response from procedure")); 
          });
        });
      },

      getRouteMaxTime: async (routeID) => {
        return new Promise((resolve, reject) => {
            const query = "CALL GetRouteMaxTime(?)";
            db.query(query, [routeID], (error, result) => {
                if (error) {
                    return reject(error);
                }
                const [response] = result;
                if (response[0].exit_code === 1) {
                    return reject(new Error(response[0].error_message));
                }
                resolve(response[0].max_time);
            });
        });
    },

    checkDriverHours: async (driverID) => {
        return new Promise((resolve, reject) => {
            const query = "CALL CheckDriverHours(?)";
            db.query(query, [driverID], (error, result) => {
                if (error) {
                    return reject(error);
                }
                const [response] = result;
                if (response[0].exit_code === 1) {
                    return reject(new Error(response[0].error_message));
                }
                resolve(response[0].total_hours || 0);
            });
        });
    },

    checkAssistantHours: async (assistantID) => {
        return new Promise((resolve, reject) => {
            const query = "CALL CheckAssistantHours(?)";
            db.query(query, [assistantID], (error, result) => {
                if (error) {
                    return reject(error);
                }
                const [response] = result;
                if (response[0].exit_code === 1) {
                    return reject(new Error(response[0].error_message));
                }
                resolve(response[0].total_hours || 0);
            });
        });
    },

    scheduleTrip: async (tripData) => {
      return new Promise((resolve, reject) => {
          const query = "CALL ScheduleTrip(?, ?, ?, ?, ?, ?)";
          db.query(query, tripData, (error, result) => {
              if (error) {
                  return reject(error);
              }
  
              const [response] = result;
              if (response[0].exit_code === 1) {
                  return reject(new Error(response[0].error_message));
              }
  
              // Resolve with the newly created schedule ID
              const newScheduleID = response[0].scheduleID;
              resolve(newScheduleID);
          });
      });
  },
  
  updateOrder: async (orderIds, scheduleId) => {
    return new Promise((resolve, reject) => {
        const query = "CALL UpdateOrder(?, ?)";
        db.query(query, [orderIds, scheduleId], (error, result) => {
            if (error) {
                return reject(error);
            }

            const [response] = result;
            if (response[0].exit_code === 1) {
                return reject(new Error(response[0].error_message));
            }

            resolve(result);
        });
    });
},

getDashboardData: async (storeID) => {
  return new Promise((resolve, reject) => {
    const query = "CALL GetDashboardData(?)";

    db.query(query, [storeID], (error, result) => {
      if (error) {
        console.error("Database query error:", error);
        return reject(new Error("Failed to retrieve dashboard data"));
      }

      // Ensure result is properly formatted
      if (result && result[0] && result[0].length > 0) {
        const [data] = result[0]; // Extract the first row of data
        resolve(data); // Pass only the data to the resolve function
      } else {
        console.warn("No data found in dashboard query result");
        resolve(null); // Resolve with null if no data is found
      }
    });
  });
},



};

module.exports = Manager;
