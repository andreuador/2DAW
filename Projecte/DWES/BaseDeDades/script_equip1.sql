-- Borrar base de datos
DROP DATABASE IF EXISTS db_project_team1;

-- Crear una base de datos
CREATE DATABASE IF NOT EXISTS db_project_team1;

-- Usar la base de datos creada
USE db_project_team1;

CREATE TABLE client (
	id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
	type_user VARCHAR(50) NOT NULL,
	user_name VARCHAR(50) NOT NULL, -- Ver más tarde
	passwd VARCHAR(20) NOT NULL,
	name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	dni VARCHAR(9) NOT NULL,
	address VARCHAR(255) NOT NULL,
	email VARCHAR(50) NOT NULL,
	phone VARCHAR(20) NOT NULL,
	target_num VARCHAR(16) NOT NULL,
	business_name VARCHAR(255) NOT NULL
);

CREATE TABLE private (
    id INT AUTO_INCREMENT PRIMARY KEY,
	FOREIGN KEY (id) REFERENCES client(id)
);

CREATE TABLE professional (
    id INT AUTO_INCREMENT PRIMARY KEY,
	CIF VARCHAR(20),
	document_LOPD VARCHAR(20) NOT NULL,
	constitution_writing VARCHAR(20) NOT NULL,
	manager_nif VARCHAR(20) NOT NULL,
	subscription BOOL NOT NULL,
	FOREIGN KEY (id) REFERENCES client(id)
);

CREATE TABLE employee (
	id INT AUTO_INCREMENT PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	last_name VARCHAR(255) NOT NULL,
	type VARCHAR(50) NOT NULL,
	passwd VARCHAR(20) NOT NULL
);

CREATE TABLE administrator (
	id INT AUTO_INCREMENT PRIMARY KEY,
	FOREIGN KEY (id) REFERENCES employee(id)
);

CREATE TABLE administrative (
	id INT AUTO_INCREMENT PRIMARY KEY,
	FOREIGN KEY (id) REFERENCES employee(id)
);