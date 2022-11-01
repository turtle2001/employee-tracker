DROP DATABASE IF EXISTS buisness_db;

CREATE DATABASE buisness_db;

USE buisness_db;

CREATE TABLE department (
    id INT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INT NOT NULL,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary DECIMAL,
    PRIMARY KEY(id),
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES role(id)
);