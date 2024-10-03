
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

-- 2. Create the Product table
CREATE TABLE `Product` (
  `product_ID` INT AUTO_INCREMENT, -- Auto-incrementing primary key
  `product_Name` varchar(20) NOT NULL UNIQUE, -- Product name is unique and cannot be NULL
  `price` numeric(6,2) NOT NULL, -- Price cannot be NULL
  `weight` INT NOT NULL, -- Weight cannot be NULL
  `volume` INT NOT NULL, -- Volume cannot be NULL
  `available_Qty` INT NOT NULL, -- Available quantity cannot be NULL
  `image_link` varchar(255) NOT NULL, -- Image link cannot be NULL
  `description` varchar(500) NOT NULL, -- Description cannot be NULL
  PRIMARY KEY (`product_ID`) -- Primary key for product_ID
);


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


