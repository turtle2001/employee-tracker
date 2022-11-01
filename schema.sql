DROP DATABASE IF EXISTS store_db;

CREATE DATABASE store_db;

USE store_db;

CREATE TABLE department (
    id INT,
    dep_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
    id INT,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id)
)