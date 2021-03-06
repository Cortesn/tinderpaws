/* 
Database dump file to build a skeleton SQL database
*/

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS 
	Animals,
	Statuses,
	Images,
	Shelters,
	Pets,
	Dispositions,
	Pets_Dispositions,
	Users,
	Employees,
	Matches;
SET FOREIGN_KEY_CHECKS = 1;

CREATE TABLE Animals (
	animal_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	type varchar(50) NOT NULL
);

CREATE TABLE Statuses (
	status_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description varchar(225) NOT NULL
);

CREATE TABLE Shelters (
	shelter_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(225) NOT NULL,
	street varchar(225) NOT NULL,
	city varchar(225) NOT NULL,
	state char(2) NOT NULL,
	zip varchar(20) NOT NULL,
	email varchar(225) NOT NULL,
	password varchar(255) NOT NULL,
	date_created date NOT NULL,
	last_updated date,
	info text,
	reset_key varchar(25)
);

CREATE TABLE Pets (
	pet_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	name varchar(50) NOT NULL,
	type int NOT NULL, 
	breed varchar(50),
	status int NOT NULL,
	date_created date NOT NULL,
	last_updated date,
	description text,
	shelter_id int NOT NULL,
	FOREIGN KEY (type) REFERENCES Animals (animal_id),
	FOREIGN KEY (status) REFERENCES Statuses (status_id),
	FOREIGN KEY (shelter_id) REFERENCES Shelters (shelter_id) ON DELETE CASCADE
);

CREATE TABLE Dispositions (
	disposition_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	description varchar(225) NOT NULL
);

CREATE TABLE Pets_Dispositions (
	pet_id int NOT NULL,
	disposition_id int NOT NULL,
	FOREIGN KEY (pet_id) REFERENCES Pets (pet_id) ON DELETE CASCADE,
	FOREIGN KEY (disposition_id) REFERENCES Dispositions (disposition_id),
	PRIMARY KEY (pet_id, disposition_id),
	CONSTRAINT UNIQUE (disposition_id, pet_id)
);

CREATE TABLE Employees (
	employee_id int NOT NULL PRIMARY KEY,
	shelter_id int NOT NULL,
	name varchar(225) NOT NULL,
	email varchar(225) NOT NULL,
	password varchar(255) NOT NULL,
	date_created date NOT NULL,
	reset_key varchar(25),
	FOREIGN KEY (shelter_id) REFERENCES Shelters (shelter_id) ON DELETE CASCADE
);

CREATE TABLE Users (
	user_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	f_name varchar(50) NOT NULL,
	l_name varchar(50) NOT NULL,
	email varchar(225) NOT NULL,
	zip varchar(20),
	password varchar(255) NOT NULL,
	date_created date NOT NULL,
	last_updated date,
	reset_key varchar(25)
);

CREATE TABLE Matches (
	match_id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
	pet_id int NOT NULL,
	user_id int NOT NULL,
	date_matched date NOT NULL,
	FOREIGN KEY (pet_id) REFERENCES Pets (pet_id) ON DELETE CASCADE,
  	FOREIGN KEY (user_id) REFERENCES Users (user_id) ON DELETE CASCADE,
	CONSTRAINT UNIQUE (match_id, pet_id)
);

CREATE TABLE Images (
	image_id int NOT NULL PRIMARY KEY,
	pet_id int NOT NULL,
	url varchar(225) NOT NULL,
	FOREIGN KEY (pet_id) REFERENCES Pets (pet_id) ON DELETE CASCADE
);

CREATE TABLE Breeds (
	breed_name VARCHAR(30) NOT NULL PRIMARY KEY,
	type int NOT NULL,
	FOREIGN KEY (type) REFERENCES Animals (animal_id)
);