const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const db = require('../config/db')

// dotenv config
dotenv.config();

const DriverModel = require('../models/drivermodel');
// handle errors

const driverController = {

    driverLogin : (req, res) => {
        const { username, password } = req.body;
    
        // Call the model to interact with the database
        DriverModel.login(username, password, (err, result) => {
            if (err) {
                console.error('Error during login:', err);
                return res.status(500).json({ message: 'Error occurred during login' });
            }
    
            const rows = result[0];
            console.log(rows[0].message);
            console.log(rows.length);
    
            // Check if login was successful
            if (rows.length > 0 && rows[0].message === 'Login successful') {
                const driver_ID = rows[0].driver_ID;
                console.log("Hi");
    
                // Generate a JWT token
                const driver = jwt.sign(
                    { driver_ID ,username}, // Payload with some user info
                    process.env.SECRET, // Secret key
                    { expiresIn: '1h' } // Token expiry (e.g., 1 hour)
                );
    
                // Set the token as an HTTP-only cookie (more secure)
                res.cookie('driver', driver, {
                    httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
                    maxAge: 3600000, // 1 hour in milliseconds
                });
    
                // Send response with login success and token
                return res.status(200).json({
                    message: 'Login successful',
                    driver_ID,
                    driver, // Optional: Send the token in the response too
                });
            } else {
                return res.status(401).json({
                    message: rows[0] ? rows[0].message : 'Login failed: Incorrect username or password',
                });
            }
        });
    },
    





};

module.exports = driverController;