CREATE DATABASE sd_device;
CREATE DATABASE sd_user;

use sd_user;

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role ENUM('client', 'admin') DEFAULT 'client',
    registration_date DATETIME DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (name, surname, email, password, role) VALUES
('Zsolt', 'Fazakas', 'zsoltfazakas14@gmail.com', 'admin', 'admin');
INSERT INTO users (name, surname, email, password, role) VALUES
('Bogdan', 'Smith', 'bogdan.smith@gmail.com', 'client', 'client');

use sd_device;
CREATE TABLE devices (
    device_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    description VARCHAR(100) NOT NULL,
    address VARCHAR(100) NOT NULL,
    mhec DOUBLE NOT NULL,
    status ENUM('active', 'inactive') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users_summary(user_id) ON DELETE CASCADE
);

CREATE TABLE users_summary (
    user_id INT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE
);

INSERT INTO users_summary(user_id,name,surname,email) VALUES
(1,'Zsolt','Fazakas','zsoltfzakas14@gmail.com');
INSERT INTO users_summary(user_id,name,surname,email) VALUES
(2,'Bogdan','Smith','bogdan.smith@gmail.com');

INSERT INTO devices (user_id, description, address, mhec, status) VALUES
(1, 'Smart Thermostat', '123 Traian', 0.75, 'active');
INSERT INTO devices (user_id, description, address, mhec, status) VALUES
(1, 'Energy Meter', '123 Bdul. Muncii', 1.20, 'active');
INSERT INTO devices (user_id, description, address, mhec, status) VALUES
(2, 'Smart Bulb', '456 Calea Floresti', 0.05, 'inactive');
INSERT INTO devices (user_id, description, address, mhec, status) VALUES
(2, 'Air Conditioner', '456 Fabricii', 1.50, 'active');


ALTER TABLE device
CHANGE COLUMN device_id device_id INT;
