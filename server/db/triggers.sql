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

-- ---------------------------------------------------------------------------------------------------------------------
--                                              Manager Triggers
-- ---------------------------------------------------------------------------------------------------------------------

DELIMITER $$
CREATE TRIGGER update_statuses_on_start
    AFTER INSERT ON TruckSchedule
    FOR EACH ROW
BEGIN
    -- Update the driver's status to active when a trip starts
    UPDATE Driver
    SET 
        status = 'active'
    WHERE driver_ID = NEW.driver_ID;

    -- When a trip starts, set the assistant's status based on current state
    UPDATE DriverAssistant
    SET 
        status = CASE 
                    WHEN status = 'inactive' THEN 'active1'
                    WHEN status = 'available' THEN 'active2'
                 END
    WHERE assistant_ID = NEW.assistant_ID;

    -- Update the truck's status to active when a trip starts
    UPDATE Truck
    SET 
        status = 'active'
    WHERE truck_ID = NEW.truck_ID;
END $$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER update_statuses_on_trip_end
    AFTER UPDATE ON TruckSchedule
    FOR EACH ROW
BEGIN
    -- Only proceed if the trip has ended (end_time is set)
    IF NEW.end_time IS NOT NULL THEN
        -- Calculate the working hours (end_time - start_time)
        SET @route_duration = TIMESTAMPDIFF(SECOND, NEW.start_time, NEW.end_time) / 3600;

        -- Update the driver's working hours and set status to inactive
        UPDATE Driver
        SET 
            current_working_time = current_working_time + @route_duration,
            status = 'inactive'  -- Set status to inactive when the trip ends
        WHERE driver_ID = NEW.driver_ID;

        -- Update the assistant's working hours and adjust the status
        UPDATE DriverAssistant
        SET 
            current_working_time = current_working_time + @route_duration,
            status = CASE 
                        WHEN status = 'active1' THEN 'available'
                        WHEN status = 'active2' THEN 'inactive'
                     END  -- Adjust status based on the current state
        WHERE assistant_ID = NEW.assistant_ID;

        -- Update the truck's status to inactive when the trip ends
        UPDATE Truck
        SET 
			used_hours = used_hours + @route_duration,
            status = 'inactive'  -- Set status to inactive when the trip ends
        WHERE truck_ID = NEW.truck_ID;
    END IF;
END $$
DELIMITER ;

DROP TRIGGER update_statuses_on_trip_end;


-- Update the discount id in cart by searching through the discount table and the quanity in the cart
DELIMITER $$

CREATE TRIGGER update_discount
BEFORE INSERT ON Cart
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
