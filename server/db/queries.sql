
-- Create DaraBase
CREATE DATABASE `FastX2.0`;

-- Use Database
USE `FastX2.0`;

-- Create Tables
-- 1. Create the Customer table
CREATE TABLE `Customer` (
  `customer_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `username` varchar(20),
  `password` VARCHAR(255) NOT NULL,
  `first_name` varchar(20),
  `last_name` varchar(20),
  `phone_number` varchar(10),
  `type` varchar(10),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE Customer
ADD CONSTRAINT check_email_format 
CHECK (email REGEXP '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$');

------------------------------------------------------------
------------------------------------------------------------

-- 2. Create the Discount table
CREATE TABLE `Discount` (
  `discount_ID` varchar(10),
  `qty_Range` INT,
  `discount` INT,
  PRIMARY KEY (`discount_ID`)
);

-- 3. Create the Store table (needed for Product, Route, and other tables)
CREATE TABLE `Store` (
  `store_ID` varchar(10),
  `order_ID` varchar(10),
  `address` varchar(50),
  `city` varchar(10),
  `contacts` varchar(10),
  PRIMARY KEY (`store_ID`)
);

-- 4. Create the Product table (store_ID references Store)
CREATE TABLE `Product` (
  `product_ID` varchar(10),
  `product_Name` varchar(20),
  `price` numeric(6,2),
  `weight` INT,
  `volume` INT,
  `available_Qty` INT,
  `store_ID` varchar(10),
  PRIMARY KEY (`product_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 5. Create the cart table (customer_ID references Customer, product_ID references Product, discount_ID references Discount)
CREATE TABLE `cart` (
  `cart_ID` varchar(10),
  `customer_ID` varchar(10),
  `product_ID` varchar(10),
  `discount_ID` varchar(10),
  `quantity` INT,
  `final_Price` numeric(6,2),
  PRIMARY KEY (`cart_ID`),
  FOREIGN KEY (`customer_ID`) REFERENCES `Customer`(`customer_ID`),
  FOREIGN KEY (`product_ID`) REFERENCES `Product`(`product_ID`),
  FOREIGN KEY (`discount_ID`) REFERENCES `Discount`(`discount_ID`)
);

-- 6. Create the Order table (cart_ID references cart)
CREATE TABLE `Order` (
  `order_ID` varchar(10),
  `cart_ID` varchar(10),
  `end_Location` varchar(50),
  `order_Date_Time` timestamp,
  PRIMARY KEY (`order_ID`),
  FOREIGN KEY (`cart_ID`) REFERENCES `cart`(`cart_ID`)
);

-- 7. Update the Store table to include the foreign key for Order (after Order table creation)
ALTER TABLE `Store`
  ADD FOREIGN KEY (`order_ID`) REFERENCES `Order`(`order_ID`);

-- 8. Create the Route table (store_ID references Store)
CREATE TABLE `Route` (
  `route_ID` varchar(10),
  `store_ID` varchar(10),
  `route` varchar(50),
  `max_time` INT,
  PRIMARY KEY (`route_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 9. Create the Train_Schedule table (store_ID references Store)
CREATE TABLE `Train_Schedule` (
  `schedule_ID` varchar(10),
  `store_ID` varchar(10),
  `departure_Time` timestamp,
  `arrival_Time` timestamp,
  `capacity` INT,
  PRIMARY KEY (`schedule_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 10. Create the Truck table (store_ID references Store, route_ID references Route)
CREATE TABLE `Truck` (
  `truck_ID` varchar(10),
  `register_No.` varchar(10),
  `capacity` INT,
  `store_ID` varchar(10),
  `route_ID` varchar(10),
  PRIMARY KEY (`truck_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`),
  FOREIGN KEY (`route_ID`) REFERENCES `Route`(`route_ID`)
);

-- 11. Create the Driver table (store_ID references Store)
CREATE TABLE `Driver` (
  `driver_ID` varchar(10),
  `status` varchar(5),
  `store_ID` varchar(10),
  `username` varchar(20),
  `password` varchar(50),
  `current_working_time` INT,
  PRIMARY KEY (`driver_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 12. Create the Driver Assistant table (store_ID references Store)
CREATE TABLE `Driver Assistant` (
  `assistant_ID` varchar(10),
  `status` varchar(5),
  `store_ID` varchar(10),
  `username` varchar(20),
  `password` varchar(50),
  `current_working_time` INT,
  PRIMARY KEY (`assistant_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 13. Create the Truck_Schedule table (references Truck, Driver, Assistant, Route, and Store)
CREATE TABLE `Truck Schedule` (
  `schedule_ID` varchar(10),
  `truck_ID` varchar(10),
  `driver_ID` varchar(10),
  `assistant_ID` varchar(10),
  `store_ID` varchar(10),
  `route_ID` varchar(10),
  `start_time` TIME,
  `end_time` TIME,
  PRIMARY KEY (`schedule_ID`),
  FOREIGN KEY (`driver_ID`) REFERENCES `Driver`(`driver_ID`),
  FOREIGN KEY (`assistant_ID`) REFERENCES `Driver Assistant`(`assistant_ID`),
  FOREIGN KEY (`truck_ID`) REFERENCES `Truck`(`truck_ID`),
  FOREIGN KEY (`route_ID`) REFERENCES `Route`(`route_ID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 14. Create the Railway Manager table (store_ID references Store)
CREATE TABLE `Railway Manager` (
  `railway_MID` varchar(10),
  `store_ID` varchar(10),
  `username` varchar(20),
  `password` varchar(50),
  PRIMARY KEY (`railway_MID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 15. Create the Branch Manager table (store_ID references Store)
CREATE TABLE `Branch Manager` (
  `branch_MID` varchar(10),
  `store_ID` varchar(10),
  `username` varchar(20),
  `password` varchar(50),
  PRIMARY KEY (`branch_MID`),
  FOREIGN KEY (`store_ID`) REFERENCES `Store`(`store_ID`)
);

-- 16. Create the Admin table
CREATE TABLE `Admin` (
  `admin_ID` varchar(10),
  `username` varchar(20),
  `password` varchar(50),
  PRIMARY KEY (`admin_ID`)
);

-- Insert Data
INSERT INTO `Railway Manager` (`railway_MID`, `store_ID`, `username`, `password`) 
VALUES ('RM001', 'S001', 'rail_manager1', 'pass123');

INSERT INTO `Product` (`product_ID`, `product_Name`, `price`, `weight`, `volume`, `available_Qty`)
VALUES ('P001', 'Product A', 250.00, 2, 10, 100),
       ('P002', 'Product B', 150.50, 1, 5, 200);

INSERT INTO `Admin` (`admin_ID`, `username`, `password`)
VALUES ('A001', 'admin1', 'adminpass');

INSERT INTO `Discount` (`discount_ID`, `qty_Range`, `discount`)
VALUES ('D001', 10, 5),
       ('D002', 20, 10);

INSERT INTO `Customer` (`customer_ID`, `first_name`, `last_name`, `password`, `username`, `phone_number`, `type`)
VALUES ('C001', 'Supun', 'Perera', 'perera123', 'supunperera', '0712345678', 'Retailer'),
       ('C002', 'Amali', 'Peiris', 'amali456', 'amalipeiris', '0771234567', 'End');

INSERT INTO `Cart` (`cart_ID`, `customer_ID`, `product_ID`, `discount_ID`, `quantity`, `final_Price`)
VALUES ('CRT001', 'C001', 'P001', 'D001', 10, 2375.00),
       ('CRT002', 'C002', 'P002', 'D002', 20, 2710.00);

INSERT INTO `Order` (`order_ID`, `cart_ID`, `end_Location`, `order_Date_Time`)
VALUES ('O001', 'CRT001', 'Colombo', NOW()),
       ('O002', 'CRT002', 'Kandy', NOW());

INSERT INTO `Store` (`store_ID`, `order_ID`, `address`, `city`, `contacts`)
VALUES ('S001', 'O001', 'No. 12, Main Street', 'Moratuwa', '0111234567'),
       ('S002', 'O002', 'No. 23, Station Road', 'Ja-Ella', '0811234567');

INSERT INTO `Train_Schedule` (`schedule_ID`, `store_ID`, `departure_Time`, `arrival_Time`, `capacity`)
VALUES ('TS001', 'S001', '2024-10-01 08:00:00', '2024-10-01 12:00:00', 1000),
       ('TS002', 'S002', '2024-10-01 09:00:00', '2024-10-01 13:00:00', 1200);

INSERT INTO `Driver` (`driver_ID`, `status`, `store_ID`, `username`, `password`, `current_working_time`)
VALUES ('D001', 'Rest', 'S001', 'driver1', 'driverpass1', 0),
       ('D002', 'Rest', 'S002', 'driver2', 'driverpass2', 0);

INSERT INTO `Driver Assistant` (`assistant_ID`, `status`, `store_ID`, `username`, `password`, `current_working_time`)
VALUES ('DA001', 'Rest', 'S001', 'assistant1', 'assistpass1', 0),
       ('DA002', 'Rest', 'S002', 'assistant2', 'assistpass2', 0);

INSERT INTO `Route` (`route_ID`, `store_ID`, `route`, `max_time`)
VALUES ('R001', 'S001', 'Colombo to Moratuwa', 2),
       ('R002', 'S002', 'Negambo to Ja-Ella', 1);

INSERT INTO `Truck` (`truck_ID`, `register_No`, `capacity`, `store_ID`, `route_ID`)
VALUES ('T001', 'NP1234', 500, 'S001', 'R001'),
       ('T002', 'NP5678', 600, 'S002', 'R002');

INSERT INTO `Branch Manager` (`branch_MID`, `store_ID`, `username`, `password`)
VALUES ('BM001', 'S001', 'branchman1', 'branchpass1'),
       ('BM002', 'S002', 'branchman2', 'branchpass2');

INSERT INTO `Truck Schedule` (`schedule_ID`, `truck_ID`, `driver_ID`, `assistant_ID`, `store_ID`, `route_ID`, `start_time`, `end_time`)
VALUES ('TS001', 'T001', 'D001', 'DA001', 'S001', 'R001', '08:00:00', '12:00:00'),
       ('TS002', 'T002', 'D002', 'DA002', 'S002', 'R002', '09:00:00', '13:00:00');


-- Create Procedures
-- Create new customer

DELIMITER $$

CREATE TRIGGER LowercaseEmail
BEFORE INSERT ON Customer
FOR EACH ROW
BEGIN
    SET NEW.email = LOWER(NEW.email);
END$$

CREATE TRIGGER ValidatePasswordLength
BEFORE INSERT ON Customer
FOR EACH ROW
BEGIN
    IF LENGTH(NEW.password) < 6 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Minimum password length is 6 characters';
    END IF;
END$$

CREATE PROCEDURE CreateUser(
    IN userEmail VARCHAR(255),
    IN uniqueUserName VARCHAR(20),
    IN hashedPassword VARCHAR(255),
    IN userFirstName VARCHAR(20),
    IN userLastName VARCHAR(20),
    IN userPhoneNumber VARCHAR(10),
    IN userType VARCHAR(10)
)
BEGIN
    DECLARE user_exists INT;

    -- Check if the email already exists
    SELECT COUNT(*) INTO user_exists FROM Customer WHERE email = userEmail;

    IF user_exists > 0 THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'that email is already registered';
    ELSE
        -- Insert the new user
        INSERT INTO Customer (email, username, password, first_name, last_name, phone_number, type) VALUES (userEmail, uniqueUserName, hashedPassword, userFirstName, userLastName, userPhoneNumber, userType);
    END IF;
END$$

CREATE PROCEDURE GetUserByEmail(
    IN userEmail VARCHAR(255)
)
BEGIN
    DECLARE user_exists INT;

    -- Check if email exists
    SELECT COUNT(*) INTO user_exists FROM Customer WHERE email = userEmail;

    IF user_exists = 0 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'That email is not registered';
    ELSE
        -- Select the user data
        SELECT id, email, password FROM Customer WHERE email = userEmail;
    END IF;
END$$

DELIMITER ;

