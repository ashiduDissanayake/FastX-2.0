
-- Insert Data
INSERT INTO `Railway Manager` (`railway_MID`, `store_ID`, `username`, `password`) 
VALUES ('RM001', 'S001', 'rail_manager1', 'pass123');

INSERT INTO `Product` (`product_ID`, `product_Name`, `price`, `weight`, `volume`, `available_Qty`)
VALUES ('P001', 'Product A', 250.00, 2, 10, 100),
       ('P002', 'Product B', 150.50, 1, 5, 200);

INSERT INTO `Admin` (`admin_ID`, `username`, `password`)
VALUES ('A001', 'admin1', 'adminpass');

INSERT INTO `Discount` (`qty_Range`, `discount`)
VALUES (10, 5),
       (20, 10);

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

