-- Create Procedures

DELIMITER $$

-- Create new customer
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

-- Get user by email
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
        SELECT customer_ID, email, password FROM Customer WHERE email = userEmail;
    END IF;
END$$

DELIMITER ;

DELIMITER //

CREATE PROCEDURE GetAllProducts()
BEGIN
    -- Declare handler for SQL exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handling SQL exception, return an error message
        SELECT 'SQL Exception Occurred. Unable to fetch products.' AS error_message;
    END;

    -- Check if any products exist
    IF (SELECT COUNT(*) FROM Product) = 0 THEN
        -- If no products exist, return a message
        SELECT 'No products available.' AS message;
    ELSE
        -- Retrieve specific columns with aliases
        SELECT 
            product_ID AS id, 
            product_Name AS name, 
            price, 
            image_link AS image, 
            description 
        FROM Product;
    END IF;
    
END //

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE CreateProduct(
    IN product_Name VARCHAR(20),
    IN price DECIMAL(6, 2),
    IN image_link VARCHAR(255),
    IN description VARCHAR(500),
    IN weight INT,
    IN volume INT,
    IN available_Qty INT
)
BEGIN
    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback transaction in case of an error
        ROLLBACK;
        SELECT 'Error occurred while creating product' AS message;
    END;

    -- Start a transaction
    START TRANSACTION;

    -- Insert the product details into the Product table
    INSERT INTO Product (product_Name, price, image_link, description, weight, volume, available_Qty)
    VALUES (product_Name, price, image_link, description, weight, volume, available_Qty);

    -- Commit the transaction if the insertion was successful
    COMMIT;

    -- Return success message
    SELECT 'Product successfully created' AS message;
END $$

DELIMITER ;

-- Get product by ID
DELIMITER $$

CREATE PROCEDURE GetProductByID(
    IN productID INT
)
BEGIN
    -- Declare handler for SQL exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handling SQL exception, return an error message
        SELECT 'SQL Exception Occurred. Unable to fetch product.' AS error_message;
    END;

    -- Check if the product exists
    IF (SELECT COUNT(*) FROM Product WHERE product_ID = productID) = 0 THEN
        -- If the product does not exist, return a message
        SELECT 'Product not found.' AS message;
    ELSE
        -- Retrieve specific columns with aliases
        SELECT 
            product_ID AS id, 
            product_Name AS name, 
            price, 
            image_link AS image, 
            description 
        FROM Product WHERE product_ID = productID;
    END IF;
    
END $$
DELIMITER ;

-- Delete product by ID
DELIMITER $$
CREATE PROCEDURE DeleteProductByID(
    IN productID INT
)
BEGIN
    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback transaction in case of an error
        ROLLBACK;
        SELECT 'Error occurred while deleting product' AS message;
    END;

    -- Start a transaction
    START TRANSACTION;

    -- Delete the product with the specified ID
    DELETE FROM Product WHERE product_ID = productID;

    -- Commit the transaction if the deletion was successful
    COMMIT;

    -- Return success message
    SELECT 'Product successfully deleted' AS message;
END $$
DELIMITER ;

-- Update product by ID
DELIMITER $$

CREATE PROCEDURE UpdateProductByID(
    IN in_productID INT,
    IN in_product_Name VARCHAR(255), -- increased length
    IN in_price DECIMAL(6, 2),
    IN in_image_link VARCHAR(255),
    IN in_description VARCHAR(500),
    IN in_weight INT,
    IN in_volume INT,
    IN in_available_Qty INT
)
BEGIN
    -- Error handling for SQL exceptions
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Rollback in case of error
        ROLLBACK;
        -- Provide a more specific error message
        SELECT 'SQL Error occurred while updating the product' AS message;
    END;

    -- Start a transaction
    START TRANSACTION;

    -- Ensure product exists before updating
    IF EXISTS (SELECT * FROM Product WHERE product_ID = in_productID) THEN
        -- Update the product details
        UPDATE Product 
        SET 
            product_Name = in_product_Name, 
            price = in_price, 
            image_link = in_image_link, 
            description = in_description, 
            weight = in_weight, 
            volume = in_volume, 
            available_Qty = in_available_Qty
        WHERE product_ID = in_productID;

        -- Commit the transaction
        COMMIT;

        -- Return success message
        SELECT 'Product successfully updated' AS message;
    ELSE
        -- Rollback the transaction if the product doesn't exist
        ROLLBACK;
        SELECT 'Product not found' AS message;
    END IF;
END $$

DELIMITER ;

-- Get all cart Products by customer_ID
DELIMITER $$
CREATE PROCEDURE GetCartProductsByCustomerID(
    IN customerID INT
)
BEGIN
    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handling SQL exception, return an error message
        SELECT 'SQL Exception Occurred. Unable to fetch cart products.' AS error_message;
    END;

    -- Check if the customer exists
    IF (SELECT COUNT(*) FROM Customer WHERE customer_ID = customerID) = 0 THEN
        -- If the customer does not exist, return a message
        SELECT 'Customer not found.' AS message;
    ELSE
        -- Retrieve specific columns with aliases
        SELECT 
            cp.product_ID AS id, 
            p.product_Name AS name, 
            p.price, 
            p.image_link AS image, 
            cp.quantity, 
            cp.final_Price
        FROM Cart cp
        JOIN Product p ON cp.product_ID = p.product_ID
        JOIN Customer c ON cp.customer_ID = c.customer_ID
        WHERE cp.customer_ID = customerID;
    END IF;
    
END $$

DELIMITER ;

DELIMITER $$
CREATE PROCEDURE AddProductToCart(
    IN p_customer_ID INT,
    IN p_product_ID INT,
    IN p_quantity INT
)
BEGIN
    DECLARE v_product_price DECIMAL(6,2);
    DECLARE v_existing_quantity INT;
    DECLARE v_available_quantity INT;

    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred while adding product to cart' AS message;
    END;

    -- Start a transaction
    START TRANSACTION;

    -- Check if the product exists and get its price and available quantity
    SELECT price, available_Qty INTO v_product_price, v_available_quantity
    FROM Product 
    WHERE product_ID = p_product_ID;

    IF v_product_price IS NULL THEN
        SELECT 'Product not found.' AS message;
        ROLLBACK;
        EXIT;
    END IF;

    -- Check if the customer exists
    IF NOT EXISTS (SELECT 1 FROM Customer WHERE customer_ID = p_customer_ID) THEN
        SELECT 'Customer not found.' AS message;
        ROLLBACK;
        EXIT;
    END IF;

    -- Check if the requested quantity is available
    IF p_quantity > v_available_quantity THEN
        SELECT 'Insufficient quantity available.' AS message, 
               v_available_quantity AS available_quantity;
        ROLLBACK;
        EXIT;
    END IF;

    -- Check if the product is already in the cart
    SELECT quantity INTO v_existing_quantity
    FROM Cart 
    WHERE customer_ID = p_customer_ID AND product_ID = p_product_ID AND status != 'Ordered';

    IF v_existing_quantity IS NOT NULL THEN
        -- If product is already in the cart, check if the new total quantity is available
        IF (v_existing_quantity + p_quantity) > v_available_quantity THEN
            SELECT 'Insufficient quantity available.' AS message, 
                   v_available_quantity AS available_quantity;
            ROLLBACK;
            EXIT;
        END IF;

        -- Update the quantity and final price
        UPDATE Cart 
        SET quantity = v_existing_quantity + p_quantity, 
            final_Price = v_product_price * (v_existing_quantity + p_quantity)
        WHERE customer_ID = p_customer_ID AND product_ID = p_product_ID;
    ELSE
        -- Insert new product into cart
        INSERT INTO Cart (customer_ID, product_ID, quantity, final_Price)
        VALUES (p_customer_ID, p_product_ID, p_quantity, v_product_price * p_quantity);
    END IF;

    -- Update the available quantity in the Product table
    UPDATE Product
    SET available_Qty = available_Qty - p_quantity
    WHERE product_ID = p_product_ID;

    -- Commit the transaction
    COMMIT;

    -- Success message
    SELECT 'Product successfully added to cart' AS message;
END $$

DELIMITER ;

-- Remove product from cart
DELIMITER $$
CREATE PROCEDURE RemoveProductFromCart(
    IN p_customer_ID INT,
    IN p_product_ID INT
)
BEGIN
    DECLARE v_existing_quantity INT;
    DECLARE v_product_price DECIMAL(6,2);

    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred while removing product from cart' AS message;
    END;

    -- Start a transaction
    START TRANSACTION;

    -- Check if the product is in the cart
    SELECT quantity INTO v_existing_quantity
    FROM Cart 
    WHERE customer_ID = p_customer_ID AND product_ID = p_product_ID;

    IF v_existing_quantity IS NULL THEN
        SELECT 'Product not found in cart.' AS message;
        ROLLBACK;
    END IF;

    -- Get the price of the product
    SELECT price INTO v_product_price
    FROM Product 
    WHERE product_ID = p_product_ID;

    -- Update the available quantity in the Product table
    UPDATE Product
    SET available_Qty = available_Qty + v_existing_quantity
    WHERE product_ID = p_product_ID;

    -- Delete the product from the cart
    DELETE FROM Cart 
    WHERE customer_ID = p_customer_ID AND product_ID = p_product_ID;

    -- Commit the transaction
    COMMIT;

    -- Success message
    SELECT 'Product successfully removed from cart' AS message;
END $$
DELIMITER ;

-- Update product quantity in cart
DELIMITER $$
CREATE PROCEDURE UpdateProductQuantityInCart(
    IN p_customer_ID INT,
    IN p_product_ID INT,
    IN p_quantity INT
)
BEGIN
    DECLARE v_existing_quantity INT;
    DECLARE v_product_price DECIMAL(6,2);
    DECLARE v_available_quantity INT;

    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred while updating product quantity in cart' AS message;
    END;

    -- Start a transaction
    START TRANSACTION;

    -- Check if the product is in the cart
    SELECT quantity INTO v_existing_quantity
    FROM Cart 
    WHERE customer_ID = p_customer_ID AND product_ID = p_product_ID;

    IF v_existing_quantity IS NULL THEN
        SELECT 'Product not found in cart.' AS message;
        ROLLBACK;
    END IF;

    -- Get the price of the product
    SELECT price, available_Qty INTO v_product_price, v_available_quantity
    FROM Product 
    WHERE product_ID = p_product_ID;

    -- Check if the requested quantity is available
    IF p_quantity > v_available_quantity THEN
        SELECT 'Insufficient quantity available.' AS message, 
               v_available_quantity AS available_quantity;
        ROLLBACK;
        EXIT;
    END IF;

    -- Update the available quantity in the Product table
    UPDATE Product
    SET available_Qty = available_Qty + v_existing_quantity - p_quantity
    WHERE product_ID = p_product_ID;

    -- Update the quantity and final price in the Cart table
    UPDATE Cart 
    SET quantity = p_quantity, 
        final_Price = v_product_price * p_quantity
    WHERE customer_ID = p_customer_ID AND product_ID = p_product_ID;

    -- Commit the transaction
    COMMIT;

    -- Success message
    SELECT 'Product quantity in cart successfully updated' AS message;
END $$
DELIMITER ;



--  ---------------------------------------------------------------------------------------
--                                  Manager Procedures
--  ---------------------------------------------------------------------------------------

-- Get Active Trips
DELIMITER $$

CREATE PROCEDURE GetActiveTripsByStore(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch active trips.' AS error_message;
    END;

    IF (SELECT COUNT(*) FROM Store WHERE store_ID = storeID) = 0 THEN
        SELECT 'Store not found.' AS message;
    ELSE
        SELECT 
            schedule_ID, 
            truck_ID, 
            driver_ID, 
            assistant_ID, 
            route_ID, 
            start_time
        FROM TruckSchedule
        WHERE store_ID = storeID AND end_time IS NULL;
    END IF;
    
END $$

DELIMITER ;

-- Get Finished Trips
DELIMITER $$

CREATE PROCEDURE GetFinishedTripsByStore(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch finished trips.' AS error_message;
    END;

    IF (SELECT COUNT(*) FROM Store WHERE store_ID = storeID) = 0 THEN
        SELECT 'Store not found.' AS message;
    ELSE
        SELECT 
            schedule_ID, 
            truck_ID, 
            driver_ID, 
            assistant_ID, 
            route_ID, 
            start_time, 
            end_time
        FROM TruckSchedule
        WHERE store_ID = storeID AND end_time IS NOT NULL
        ORDER BY end_time DESC;
    END IF;

END $$

DELIMITER ;

-- Get Train Orders 
DELIMITER $$

CREATE PROCEDURE GetTrainOrdersByStore(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch train orders.' AS error_message;
    END;

    IF (SELECT COUNT(*) FROM Store WHERE store_ID = storeID) = 0 THEN
        SELECT 'Store not found.' AS message;
    ELSE
        SELECT 
            o.order_id, 
            o.route_id, 
            SUM(oi.quantity) AS capacity
        FROM `Order` o
        JOIN Route r ON o.route_id = r.route_ID
        LEFT JOIN OrderItem oi USING(order_id)
        WHERE r.store_ID = storeID AND o.status = 'Shipped'
        GROUP BY o.order_id;
    END IF;

END $$

DELIMITER ;

-- get stores
DELIMITER $$

CREATE PROCEDURE GetAllStores()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch stores.' AS error_message;
    END;

    SELECT * FROM Store;
END $$

DELIMITER ;

-- Get Store Orders
DELIMITER $$

CREATE PROCEDURE GetStoreOrdersByStore(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch train orders.' AS error_message;
    END;

    IF (SELECT COUNT(*) FROM Store WHERE store_ID = storeID) = 0 THEN
        SELECT 'Store not found.' AS message;
    ELSE
        SELECT 
            o.order_id, 
            o.route_id, 
            SUM(oi.quantity) AS capacity
        FROM `Order` o
        JOIN Route r ON o.route_id = r.route_ID
        LEFT JOIN OrderItem oi USING(order_id)
        WHERE r.store_ID = storeID AND o.status = 'In Branch'
        GROUP BY o.order_id;
    END IF;

END $$

DELIMITER ;

-- Get  drivers
DELIMITER $$

CREATE PROCEDURE GetDriversByStoreID(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch drivers.' AS error_message;
    END;

    SELECT * FROM Driver WHERE store_ID = storeID; 
END $$

DELIMITER ;

-- get driver assistants
DELIMITER $$

CREATE PROCEDURE GetDriverAssistantsByStoreID(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch driver assistants.' AS error_message;
    END;

    SELECT * FROM DriverAssistant WHERE store_ID = storeID; 
END $$

DELIMITER ;

-- get trucks
DELIMITER $$

CREATE PROCEDURE GetTrucksByStoreID(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch trucks.' AS error_message;
    END;

    SELECT * FROM Truck WHERE store_ID = storeID; 
END $$

DELIMITER ;

-- get routes
DELIMITER $$

CREATE PROCEDURE GetRoutesByStoreID(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to fetch routes.' AS error_message;
    END;

    SELECT * FROM Route WHERE store_ID = storeID;
END $$

DELIMITER ;

-- update orders to branch 
DELIMITER $$

CREATE PROCEDURE UpdateOrdersToBranchByStoreID(
    IN storeID INT
)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to update orders.' AS error_message;
        ROLLBACK; 
    END;

    START TRANSACTION; 

    UPDATE `Order`
    SET status = 'In Branch'
    WHERE route_id IN (
        SELECT route_ID 
        FROM Route 
        WHERE store_ID = storeID
    ) 
    AND status = 'Shipped';

    COMMIT; 

    SELECT 'Orders updated successfully.' AS success_message; 

END $$

DELIMITER ;


-- end trip 
DELIMITER $$

CREATE PROCEDURE EndTripByID(IN scheduleID INT)
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        SELECT 'SQL Exception Occurred. Unable to end trip.' AS error_message;
    END;

    IF NOT EXISTS (
        SELECT 1 FROM TruckSchedule WHERE schedule_ID = scheduleID
    ) THEN
        SELECT 'Trip not found.' AS error_message;
    END IF;

    UPDATE TruckSchedule
    SET end_time = NOW() 
    WHERE schedule_ID = scheduleID;

    SELECT 'Trip ended successfully!' AS success_message; 
END $$

DELIMITER ;


-- schedule trip


DELIMITER $$

CREATE PROCEDURE GetRouteMaxTime(IN routeID INT)
BEGIN
    DECLARE maxTime INT DEFAULT NULL;  
    DECLARE exit_code INT DEFAULT 0;  

    -- Retrieve the max_time for the specified route
    SELECT max_time INTO maxTime FROM Route WHERE route_ID = routeID;

    -- Check if max_time was found
    IF maxTime IS NULL THEN
        SET exit_code = 1;  
        -- Output an error message and code
        SELECT 'Route not found.' AS error_message, exit_code;  
    ELSE
        -- If found, output the max_time and exit_code
        SELECT maxTime, exit_code;  
    END IF;

END $$

-- Procedure to check driver hours
CREATE PROCEDURE CheckDriverHours(IN driverID INT)
BEGIN
    DECLARE total_hours INT;

    SELECT current_working_time INTO total_hours FROM Driver WHERE driver_ID = driverID;

    IF total_hours IS NULL THEN
        SELECT 'Driver not found.' AS error_message, 1; 
    END IF;

    SELECT total_hours, 0;  
END $$

-- Procedure to check assistant hours
CREATE PROCEDURE CheckAssistantHours(IN assistantID INT)
BEGIN
    DECLARE total_hours INT;

    SELECT current_working_time INTO total_hours FROM DriverAssistant WHERE assistant_ID = assistantID;

    IF total_hours IS NULL THEN
        SELECT 'Assistant not found.' AS error_message, 1; 
    END IF;

    SELECT total_hours, 0;  
END $$

-- Procedure to schedule the trip
CREATE PROCEDURE ScheduleTrip(
    IN truckID INT,
    IN driverID INT,
    IN assistantID INT,
    IN storeID INT,
    IN routeID INT,
    IN startTime DATETIME
)
BEGIN
    DECLARE exit_code INT DEFAULT 0;  
    DECLARE error_message VARCHAR(255);

    INSERT INTO TruckSchedule (truck_ID, driver_ID, assistant_ID, store_ID, route_ID, start_time, end_time)
    VALUES (truckID, driverID, assistantID, storeID, routeID, startTime, NULL);

    IF ROW_COUNT() = 0 THEN
        SET error_message = 'Failed to schedule trip.';
        SET exit_code = 1;  
    END IF;

    SELECT error_message, exit_code;  
END $$

DELIMITER ;


-- Procedure to update order status
DELIMITER $$

CREATE PROCEDURE UpdateOrderStatus(IN orderIds VARCHAR(255))
BEGIN
    DECLARE exit_code INT DEFAULT 0;  
    DECLARE error_message VARCHAR(255) DEFAULT '';

    START TRANSACTION;

    UPDATE `Order` 
    SET status = 'Delivered' 
    WHERE order_id IN (SELECT CAST(SUBSTRING_INDEX(SUBSTRING_INDEX(orderIds, ',', numbers.n), ',', -1) AS UNSIGNED) 
                         FROM (SELECT 1 n UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 
                               UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8 
                               UNION ALL SELECT 9 UNION ALL SELECT 10) numbers
                         WHERE CHAR_LENGTH(orderIds) - CHAR_LENGTH(REPLACE(orderIds, ',', '')) >= numbers.n - 1);

    IF ROW_COUNT() = 0 THEN
        SET error_message = 'No orders were updated. Check if the order IDs are valid.';
        SET exit_code = 1;  
        ROLLBACK;  
    ELSE
        COMMIT;  
    END IF;

    SELECT error_message AS message, exit_code;  
END $$

DELIMITER ;


-- railwaymanager

DELIMITER $$

-- Procedure to Get Train Schedule
CREATE PROCEDURE GetTrainSchedule()
BEGIN
    DECLARE exit_code INT DEFAULT 0;
    DECLARE error_message VARCHAR(255) DEFAULT '';

    -- Retrieve all records from the TrainSchedule table
    SELECT * FROM TrainSchedule;

END $$

-- Procedure to Update Train Schedule
CREATE PROCEDURE UpdateTrainSchedule(
    IN schedule_ID INT,
    IN departure_Time TIME,
    IN arrival_Time TIME
)
BEGIN
    DECLARE exit_code INT DEFAULT 0;
    DECLARE error_message VARCHAR(255) DEFAULT '';

    START TRANSACTION;

    -- Update the schedule details in the TrainSchedule table
    UPDATE TrainSchedule 
    SET departure_Time = departure_Time, 
        arrival_Time = arrival_Time
    WHERE schedule_ID = schedule_ID;

    -- Check if any rows were affected
    IF ROW_COUNT() = 0 THEN
        SET error_message = 'Train schedule not found.';
        SET exit_code = 1;
        ROLLBACK;
    ELSE
        COMMIT;
    END IF;

    SELECT error_message AS message, exit_code;

END $$

DELIMITER ;





DELIMITER //

-- Procedure for Main Manager Login
CREATE PROCEDURE MainManagerLogin(
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    DECLARE msg VARCHAR(255);

    SELECT manager_id AS manager_id, 
           CASE 
               WHEN password = p_password THEN 'Successful login' 
               ELSE 'Incorrect password' 
           END AS message
    INTO @manager_id, msg
    FROM main_manager 
    WHERE username = p_username;

    IF msg IS NULL THEN
        SET msg = 'Incorrect username';
    END IF;

    SELECT @manager_id AS manager_id, msg AS message;
END //

-- Procedure for Retrieving Drivers
CREATE PROCEDURE GetDriverByStoreID(IN p_storeId INT)
BEGIN
    SELECT * FROM driver WHERE store_ID = p_storeId;
END //

-- Procedure for Retrieving Driver Assistants
CREATE PROCEDURE GetDriverAssistantByStoreID(IN p_storeId INT)
BEGIN
    SELECT * FROM driver_assistant WHERE store_ID = p_storeId;
END //

-- Procedure for Retrieving Truck Details
CREATE PROCEDURE GetTruckByStoreID(IN p_storeId INT)
BEGIN
    SELECT * FROM truck WHERE store_ID = p_storeId;
END //

-- Procedure for Retrieving All Orders
CREATE PROCEDURE GetAllOrders()
BEGIN
    SELECT * FROM `Order`;
END //

-- Procedure for Retrieving Selected Orders
CREATE PROCEDURE GetPendingOrdersByStoreID(IN p_storeId INT)
BEGIN
    SELECT * 
    FROM `Order` 
    JOIN Route ON Order.route_id = Route.route_ID 
    WHERE store_ID = p_storeId AND Order.status = 'Pending';
END //

-- Procedure for Retrieving Train Capacity
CREATE PROCEDURE GetTrainCapacityByStoreID(IN p_storeId INT)
BEGIN
    SELECT capacity FROM TrainSchedule WHERE store_ID = p_storeId;
END //

-- Procedure for Retrieving Train Schedule
CREATE PROCEDURE GetTrainSchedule()
BEGIN
    SELECT * FROM TrainSchedule;
END //

-- Procedure for Updating Train Schedule
CREATE PROCEDURE UpdateTrainSchedule(
    IN p_schedule_ID INT,
    IN p_departure_Time DATETIME,
    IN p_arrival_Time DATETIME
)
BEGIN
    UPDATE TrainSchedule 
    SET departure_Time = p_departure_Time, 
        arrival_Time = p_arrival_Time 
    WHERE schedule_ID = p_schedule_ID;
END //

-- Procedure for Updating Order Status
CREATE PROCEDURE UpdateOrderStatus(
    IN p_order_id INT,
    IN p_status VARCHAR(50)
)
BEGIN
    UPDATE `Order` 
    SET status = p_status 
    WHERE order_id = p_order_id;
END //

-- Procedure for Scheduling a Trip
CREATE PROCEDURE ScheduleTrip(
    IN p_truck_ID INT,
    IN p_driver_ID INT,
    IN p_assistant_ID INT,
    IN p_store_ID INT,
    IN p_route_ID INT,
    IN p_start_time DATETIME,
    IN p_end_time DATETIME
)
BEGIN
    INSERT INTO truck_schedule (
        truck_ID, 
        driver_ID, 
        assistant_ID, 
        store_ID, 
        route_ID, 
        start_time, 
        end_time
    )
    VALUES (
        p_truck_ID, 
        p_driver_ID, 
        p_assistant_ID, 
        p_store_ID, 
        p_route_ID, 
        p_start_time, 
        p_end_time
    );
END //

DELIMITER ;
