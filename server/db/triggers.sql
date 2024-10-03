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

-- Update total working hours of driver
DELIMITER $$
CREATE TRIGGER update_driver_hours
	AFTER INSERT ON truck_schedule
    FOR EACH ROW
BEGIN
	DECLARE route_duration INT;
    
    SELECT max_time INTO route_duration
    FROM route
    WHERE route_ID = NEW.route_ID;
    
	UPDATE driver
    SET current_working_time = current_working_time + route_duration
    WHERE driver_ID = NEW.driver_ID;
END $$
DELIMITER ;

-- Update total working hours of driver assistant

DELIMITER $$
CREATE TRIGGER update_assistent_hours
	AFTER INSERT ON truck_schedule
    FOR EACH ROW
BEGIN
	DECLARE route_duration INT;
    
    SELECT max_time INTO route_duration
    FROM route
    WHERE route_ID = NEW.route_ID;
    
	UPDATE driver_assistant
    SET current_working_time = current_working_time + route_duration
    WHERE assistant_ID = NEW.assistant_ID;
END $$
DELIMITER ;
