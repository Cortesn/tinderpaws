INSERT INTO Animals (type) VALUES
('Dog'),
('Cat'),
('Other');

INSERT INTO Statuses (description) VALUES
('Not Available'),
('Available'),
('Pending'),
('Adopted');

INSERT INTO Shelters (name, street, city, state, zip, email, password, date_created, last_updated, info) VALUES
('Test Shelter No. 1', '1234 Shelter St', 'Seattle', 'WA', '88888', 'shelter1@test.com', '123456', '2021-10-10', '2021-10-13', 'Our goal is the match pets with their forever homes!'),
('Test Shelter No. 2', '4567 Adopted St', 'Seattle', 'WA', '88888', 'shelter2@test.com', '123456', '2021-10-12', '2021-10-14', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'),
('Test Shelter No. 3', '888 Dog St', 'Seattle', 'WA', '88888', 'shelter3@test.com', '123456', '2021-10-15', '2021-10-15', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');

INSERT INTO Pets (name, type, breed, status, date_created, last_updated, description, shelter_id) VALUES
('Spike', 1, 'Golden Retriever', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1),
('Fluffy', 1, 'German Sheperd', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2),
('Paul', 2, 'Bengal', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 1),
('Meowzer', 2, 'Munchkin', 2, '2021-10-15', null, 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', 2);

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

INSERT INTO Employees (employee_id, shelter_id, name, email, password, date_created) VALUES
(1, 1, 'John', 'john@test.com', '123456', '2021-10-15'),
(2, 1, 'Jane', 'jane@test.com', '123456', '2021-10-15'),
(3, 2, 'Test', 'test@test.com', '123456', '2021-10-15');

INSERT INTO Users (f_name, l_name, email, zip, password, date_created, last_updated) VALUES
('test1', 'test1', 'test483@test.com', '98145', '123456', '2021-10-15', '2021-10-15'),
('TestUser', 'TestUser', 'testuser@test.com', '88888', '123456', '2021-10-15', '2021-10-15'),
('TestUser2', 'TestUser2', 'testuser2@test.com', '88888', '123456', '2021-10-15', '2021-10-15');

INSERT INTO Matches (pet_id, user_id, date_matched) VALUES
(1, 1, '2021-10-15'),
(2, 1, '2021-10-15'),
(3, 1, '2021-10-15'),
(1, 2, '2021-10-15'),
(2, 2, '2021-10-15'),
(3, 2, '2021-10-15'),
(1, 3, '2021-10-15');

INSERT INTO Breeds VALUES 
('Labrador Retrievers', 1),
('French Bulldog', 1),
('German Shepherd', 1),
('Golden Retrievers', 1),
('Bulldog', 1),
('Poodle', 1),
('Beagle', 1),
('Rottweiler', 1),
('Pointer', 1),
('Dachshund', 1),
('Pembroke Welsh Corgi', 1),
('Australian Shepherd', 1),
('Yorkshire Terrier', 1),
('Boxer', 1),
('Great Dane', 1),
('Siberian Huskie', 1),
('Doberman Pinscher', 1),
('Miniature Schnauzer', 1),
('Shih Tzu', 1),
('Boston Terrier', 1),
('Bernese Mountain', 1),
('Pomeranian', 1),
('Havanese', 1),
('Pug', 1),
('Cocker Spaniels', 1),
('Border Collie', 1),
('Mastiff', 1),
('Chihuahua', 1),
('Basset Hound', 1),
('Belgian Malinoi', 1),
('Maltese', 1),
('Weimaraner', 1),
('Collies', 1),
('Shiba Inu', 1),
('Bichons Frise', 1),
('Bloodhound', 1),
('Akita', 1),
('Domestic Shorthair', 2),
('American Shorthair', 2),
('Domestic Longhair', 2),
('Maine Coon', 2),
('Siamese', 2),
('Russian Blue', 2),
('Ragdoll', 2),
('Bengal', 2),
('Bombay', 2),
('Persian', 2),
('Munchkin', 2),
('American Wirehair', 2),
('Burmese', 2),
('Chartreux', 2);
