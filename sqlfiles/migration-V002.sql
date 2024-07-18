USE ynov_ci; 
CREATE TABLE users 
(
    id INT PRIMARY KEY AUTO_INCREMENT,
    lastName VARCHAR(255),
    firstName VARCHAR(255),
    email VARCHAR(255),
    birthDate DATE,
    city VARCHAR(255),
    zipCode VARCHAR(5)
);
