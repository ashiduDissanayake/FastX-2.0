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

-- Add product to cart
DELIMITER $$

CREATE PROCEDURE AddProductToCart(
    IN customerID INT,
    IN productID INT,
    IN quantity INT
)
BEGIN
    DECLARE discount_id INT;
    DECLARE discount_value DECIMAL(5,2);
    DECLARE product_price DECIMAL(6,2);

    -- Declare an exception handler for SQL errors
    DECLARE EXIT HANDLER FOR SQLEXCEPTION 
    BEGIN
        ROLLBACK;
        SELECT 'Error occurred while adding product to cart' AS message;
    END;

    -- Start a transaction
    START TRANSACTION;

    -- Check if the product exists
    IF (SELECT COUNT(*) FROM Product WHERE product_ID = productID) = 0 THEN
        -- Product does not exist
        SELECT 'Product not found.' AS message;
    ELSE
        -- Check if the customer exists
        IF (SELECT COUNT(*) FROM Customer WHERE customer_ID = customerID) = 0 THEN
            -- Customer does not exist
            SELECT 'Customer not found.' AS message;
        ELSE
            -- Get the product price
            SELECT price INTO product_price FROM Product WHERE product_ID = productID;

            -- Check if the product is already in the cart
            IF (SELECT COUNT(*) FROM Cart WHERE customer_ID = customerID AND product_ID = productID) > 0 THEN
                -- If product is already in the cart, update the quantity and final price
                UPDATE Cart 
                SET quantity = quantity + quantity, 
                    final_Price = product_price * (quantity + quantity)
                WHERE customer_ID = customerID AND product_ID = productID;
            ELSE
                -- Insert product into cart
                INSERT INTO Cart (customer_ID, product_ID, quantity, final_Price)
                VALUES (customerID, productID, quantity, product_price * quantity);
            END IF;

            -- Calculate discount based on quantity and apply
            SELECT discount_ID, discount INTO discount_id, discount_value
            FROM discount
            WHERE qty_Range <= quantity
            ORDER BY qty_Range DESC
            LIMIT 1;

            -- Apply the discount
            UPDATE Cart
            SET discount_ID = discount_id,
                final_Price = product_price * quantity * (1 - discount_value / 100)
            WHERE customer_ID = customerID AND product_ID = productID;

            -- Commit the transaction
            COMMIT;

            -- Success message
            SELECT 'Product successfully added to cart with discount applied' AS message;
        END IF;
    END IF;
END $$

DELIMITER ;
