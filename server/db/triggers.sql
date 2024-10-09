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

DELIMITER ;

-- Update total working hours and status of driver 
DELIMITER $$
CREATE TRIGGER update_driver_hours
    AFTER INSERT ON truck_schedule
    FOR EACH ROW
BEGIN
    DECLARE route_duration INT;
    
    -- Get the maximum time (route duration) from the route table
    SELECT max_time INTO route_duration
    FROM route
    WHERE route_ID = NEW.route_ID;
    
    -- Update both the current working time and status of the driver
    UPDATE driver
    SET 
        current_working_time = current_working_time + route_duration,
        status = 'active'
    WHERE driver_ID = NEW.driver_ID;
		
END $$
DELIMITER ;

-- Update total working hours of driver assistant

DELIMITER $$
CREATE TRIGGER update_assistant_hours
AFTER INSERT ON truck_schedule
FOR EACH ROW
BEGIN
    DECLARE route_duration INT;

    -- Get the maximum time (route duration) from the route table
    SELECT max_time INTO route_duration
    FROM route
    WHERE route_ID = NEW.route_ID;

    -- Update both the current working time and status of the driver
    UPDATE driver_assistant
    SET 
        current_working_time = current_working_time + route_duration,
        status = CASE 
            WHEN status = 'inactive' THEN 'active1'
            WHEN status = 'available' THEN 'active2'
            ELSE status
        END
    WHERE assistant_ID = NEW.assistant_ID;
END $$
DELIMITER ;

-- Update the discount id in cart by searching through the discount table and the quanity in the cart
DELIMITER $$

CREATE TRIGGER update_discount
BEFORE INSERT ON cart
FOR EACH ROW
BEGIN
    DECLARE discount_id INT;
    DECLARE discount_value DECIMAL(5,2);

    -- Select the closest qty_Range that is less than or equal to the new quantity
    SELECT discount_ID, discount 
    INTO discount_id, discount_value
    FROM discount
    WHERE qty_Range <= NEW.quantity
    ORDER BY qty_Range DESC
    LIMIT 1;

    -- Update the discount_ID and calculate the final price based on discount
    SET NEW.discount_ID = discount_id;
    SET NEW.final_Price = (SELECT price FROM Product WHERE product_ID = NEW.product_ID) 
                          * NEW.quantity * (1 - discount_value / 100);
END $$

DELIMITER ;
