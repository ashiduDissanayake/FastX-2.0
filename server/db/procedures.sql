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

-- get drivers
DELIMITER $$

CREATE PROCEDURE GetDriversByStoreID(
    IN storeID INT
)
BEGIN
    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handling SQL exception, return an error message
        SELECT 'SQL Exception Occurred. Unable to fetch drivers.' AS error_message;
    END;

   --  -- Select drivers for the specified store
--     SELECT * FROM Driver WHERE store_ID = storeID; 
-- Select drivers along with their last trip end time for the specified store
    SELECT d.*, 
           (SELECT end_time 
            FROM TruckSchedule 
            WHERE driver_ID = d.driver_ID 
            ORDER BY end_time DESC 
            LIMIT 1) AS last_trip_end_time
    FROM Driver d
    WHERE d.store_ID = storeID;
END $$

DELIMITER ;

-- get driver assistants
DELIMITER $$

CREATE PROCEDURE GetDriverAssistantsByStoreID(
    IN storeID INT
)
BEGIN
    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handling SQL exception, return an error message
        SELECT 'SQL Exception Occurred. Unable to fetch driver assistants.' AS error_message;
    END;

    -- Select driver assistants for the specified store
    SELECT d.*, 
           (SELECT end_time 
            FROM TruckSchedule 
            WHERE assistant_ID = d.assistant_ID 
            ORDER BY end_time DESC 
            LIMIT 1) AS last_trip_end_time
    FROM DriverAssistant d
    WHERE d.store_ID = storeID;
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


DELIMITER //

CREATE PROCEDURE InsertBranchManager(
    IN p_name VARCHAR(255),
    IN p_username VARCHAR(255),
    IN p_email VARCHAR(255),
    IN p_password VARCHAR(255),
    IN p_store_ID INT
)
BEGIN
    INSERT INTO BranchManager (name, username, email, password, store_ID)
    VALUES (p_name, p_username, p_email, p_password, p_store_ID);
END //

DELIMITER ;


DELIMITER //

CREATE TRIGGER EncryptBranchManagerPassword
BEFORE INSERT ON BranchManager
FOR EACH ROW
BEGIN
    SET NEW.password = AES_ENCRYPT(NEW.password, 'your_strong_key_256_bits!');  -- Use a secure key for encryption
END //

DELIMITER ;


DELIMITER //

CREATE PROCEDURE ManagerLogin(
    IN p_username VARCHAR(255),
    IN p_password VARCHAR(255)
)
BEGIN
    -- Declare variables at the beginning
    DECLARE stored_password VARBINARY(255);
    DECLARE decrypted_password VARCHAR(255);
    DECLARE login_status VARCHAR(50) DEFAULT 'Login failed';
    DECLARE manager_id INT;  -- Variable to hold the manager ID
    
    -- Declare the error handler before the transaction begins
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        ROLLBACK;  -- Roll back transaction in case of error
        SET login_status = 'Error occurred during login';
        -- Return the error message
        SELECT login_status AS login_message;
    END;

    -- Start the transaction
    START TRANSACTION;
    
    -- Try to retrieve the encrypted password and manager ID from the database
    SELECT password, manager_ID INTO stored_password, manager_ID 
    FROM BranchManager 
    WHERE username = p_username;

    -- Check if the username exists
    IF stored_password IS NULL THEN
        -- Username does not exist, return error message
        SET login_status = 'Username not found';
        ROLLBACK;
        SELECT login_status AS login_message;
    END IF;
    
    -- Decrypt the stored password
    SET decrypted_password = AES_DECRYPT(stored_password, 'your_strong_key_256_bits!');

    -- Check if decryption returned NULL (which means wrong decryption key)
    IF decrypted_password IS NULL THEN
        -- Decryption failed
        SET login_status = 'Password decryption failed';
        ROLLBACK;
        SELECT login_status AS login_message;
    END IF;

    -- Compare the decrypted password with the provided password
    IF decrypted_password = p_password THEN
        -- If the password matches, set the status to successful
        SET login_status = 'Login successful';
        COMMIT;  -- Commit only if login is successful

        -- Return the manager ID along with the login status
        SELECT login_status AS login_message, manager_id AS ManagerID;
    ELSE
        -- Passwords do not match
        SET login_status = 'Incorrect password';
        ROLLBACK;  -- Rollback on failure
        SELECT login_status AS login_message;
    END IF;

END //

DELIMITER ;


DELIMITER $$

CREATE PROCEDURE GetStoreIDByManagerID(IN managerID INT)
BEGIN
    DECLARE storeID INT;  -- Declare a variable to hold the store ID

    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        -- Handling SQL exception, return an error message
        SELECT 'SQL Exception Occurred. Unable to fetch store ID.' AS error_message;
    END;

    -- Retrieve the store_ID for the given manager_ID
    SELECT store_ID INTO storeID  -- Use INTO to assign the result to the variable
    FROM BranchManager
    WHERE manager_ID = managerID;

    -- Check if a store_ID was found
    IF storeID IS NULL THEN
        SELECT 'No store found for this manager ID.' AS error_message;
    ELSE
        SELECT storeID AS store_ID;  -- Return the found store_ID
    END IF;
END $$

DELIMITER ;
