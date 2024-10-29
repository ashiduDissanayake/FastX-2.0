const db = require("../config/db");

const RailwayManager = {
    getTrainSchedule: () => {
        return new Promise((resolve, reject) => {
            const query = "CALL GetTrainSchedule()";
            db.query(query, (error, result) => {
                if (error) {
                    return reject(error);
                }
                resolve(result[0]); // Return the first result set
            });
        });
    },

    updateTrainSchedule: (schedule_ID, departure_Time, arrival_Time) => {
        return new Promise((resolve, reject) => {
            const query = "CALL UpdateTrainSchedule(?, ?, ?)";
            db.query(query, [schedule_ID, departure_Time, arrival_Time], (error, result) => {
                if (error) {
                    return reject(error);
                }
                const [response] = result;
                if (response[0].exit_code === 1) {
                    return reject(new Error(response[0].message));
                }
                resolve(response);
            });
        });
    }
};

module.exports = RailwayManager;
