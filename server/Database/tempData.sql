INSERT INTO Animals (name) VALUES
('Dog'),
('Cat'),
('Other');

INSERT INTO Statuses (description) VALUES
('Not Available'),
('Available'),
('Pending'),
('Adopted');

-- INSERT INTO Images (url) VALUES
-- ();

INSERT INTO Shelters (name, street, city, state, zip, date_created, last_updated, info) VALUES
('Test Shelter No. 1', '1234 Shelter St', 'Seattle', 'WA', '88888', '2021-10-10', '2021-10-13', 'Our goal is the match pets with their forever homes!'),
('Test Shelter No. 2', '4567 Adopted St', 'Seattle', 'WA', '88888', '2021-10-12', '2021-10-14', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
('Test Shelter No. 3', '888 Dog St', 'Seattle', 'WA', '88888', '2021-10-15', '2021-10-15', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

INSERT INTO Pets (type, breed, status, date_created, last_updated, description, shelter_id) VALUES
(1, 'Golden Retriever', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1),
(1, 'German Sheperd', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2),
(2, 'Bengal', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1),
(2, 'Munchkin', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2);

INSERT INTO Dispositions (description) VALUES
('Good with other animals'),
('Good with children'),
('Animal must be leashed at all times');

INSERT INTO Pets_Dispositions (pet_id, disposition_id) VALUES
(1, 1),
(1, 2),
(2, 3),
(3, 1),
(3, 2),
(4, 2);

INSERT INTO Employees (shelter_id, name, email, password, date_created) VALUES
(1, 'John', 'john@test.com', '123456', '2021-10-15'),
(1, 'Jane', 'jane@test.com', '123456', '2021-10-15'),
(2, 'Test', 'test@test.com', '123456', '2021-10-15');

INSERT INTO Users (f_name, l_name, email, password, date_created, last_updated) VALUES
('Andrew', 'Jung', 'jungan@oregonstate.edu', '123456', '2021-10-15', '2021-10-15'),
('TestUser', 'TestUser', 'testuser@test.com', '123456', '2021-10-15', '2021-10-15'),
('TestUser2', 'TestUser2', 'testuser2@test.com', '123456', '2021-10-15', '2021-10-15');

INSERT INTO Matches (pet_id, user_id, date_matched) VALUES
(1, 1, '2021-10-15'),
(2, 1, '2021-10-15'),
(3, 1, '2021-10-15'),
(1, 2, '2021-10-15'),
(2, 2, '2021-10-15'),
(3, 2, '2021-10-15'),
(1, 3, '2021-10-15');
