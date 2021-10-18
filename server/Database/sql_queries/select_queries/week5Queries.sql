-- get shelter information

SELECT shelters.name, shelters.street, shelters.city, shelters.state, shelters.zip, shelters.info FROM shelters INNER JOIN employees on shelter.id = employees.shelter_id WHERE employees.id = :employee_id;

-- get employee name

SELECT employees.name FROM employees WHERE employees.id = :employee_id;

-- user settings

-- add employee data to settings form 

SELECT f_name, l_name, email, password FROM users WHERE users.id = :user_id;

-- update user settings query

UPDATE users SET f_name = :first_name_from_form, l_name = :last_name_from_form, email=:email_from_form, password=:password_from_form WHERE  f_name = :first_name_from_form AND l_name = :last_name_from_form;

-- filter settings

-- shelters

SELECT DISTINCT(name) FROM shelters;

-- breeds ask q to group

SELECT DISTINCT(breed) FROM pets




-- matches
SELECT pets.name FROM pets INNER JOIN matches on pets.id = matches.pet_id INNER JOIN users on users.id = matches.user_id WHERE users.id = matches.user_id;