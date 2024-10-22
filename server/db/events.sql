DROP EVENT IF EXISTS reset_working_hours_event;

DELIMITER $$
CREATE EVENT reset_working_hours_event
ON SCHEDULE EVERY 1 WEEK
STARTS '2024-10-21 00:00:00' 
DO BEGIN
  -- Reset working hours for drivers
  UPDATE Driver
  SET current_working_time = 0;

  -- Reset working hours for driver assistants
  UPDATE DriverAssistant
  SET current_working_time = 0;
END $$
DELIMITER ;
