CREATE DATABASE QyA;
USE DATABASE QyA;

CREATE TABLE users(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	fullname VARCHAR(50) NOT NULL,
	username VARCHAR(50) NOT NULL,
	password VARCHAR(100) NOT NULL
);

CREATE TABLE category(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	category_name VARCHAR(50)
);

CREATE TABLE question(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,	
	title VARCHAR (300),
	description VARCHAR(1000),
	image VARCHAR(500),
	user_id INT(11),
	CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id),
	category_id INT(11),
	CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id)
);

CREATE TABLE answer(
	id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
	desc_answer VARCHAR(1000),
	users_id INT(11),
	CONSTRAINT fk_users FOREIGN KEY (users_id) REFERENCES users(id),
	question_id INT(11),
	CONSTRAINT fk_question FOREIGN KEY (question_id) REFERENCES question(id)
);

INSERT INTO category VALUES (3,'Node JS'), (4, 'Visual Studio'), (5, 'Azure'), (6, 'Java'), (7, 'React JS')