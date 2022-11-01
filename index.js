import inquirer from 'inquirer';
import mysql from 'mysql2';
import cTbale from 'console.table';

// const inquirer = require('inquirer');
// const mysql = require('mysql2');
// const cTable = require('console.table');

const conn = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Oaklandaz921.',
        database: 'buisness_db'
    },
    console.log(`Connected to the buisness_db database.`)
);

function start() {
    inquirer
        .prompt(
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role',
                    'View All Departments', 'Add Department', 'Quit']
            }
        )
        .then((res) => {
            switch (res.choice) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateRole()
                    break;
                case 'View All Roles':
                    viewRoles();
                    break;
                case 'Add Role':
                    addRole();
                    break;
                case 'View All Departments':
                    viewDepartments();
                    break;
                case 'Add Department':
                    addDepartment();
                    break;
                case 'Quit':
                    quit();
                    break;
            }
        })
}

//done
function viewDepartments() {
    let query = "SELECT * from department";
    conn.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//done
function viewRoles() {
    let query = "SELECT role.id AS roleID, role.title AS title, department.name AS department, role.salary AS salary FROM role JOIN department ON department.id = role.department_id;";
    conn.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//done
function viewEmployees() {
    let query = "SELECT * from employee";
    conn.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}


//done
function addDepartment() {
    inquirer
        .prompt(
            {
                message: 'What is the name of the department?',
                name: 'name',
            }
        )
        .then((res) => {
            let query = `INSERT INTO department (name) VALUES ("${res.name}");`;
            conn.query(query, function (err, res) {
                if (err) throw err;
                viewDepartments();
                start();
            });
        })
}

async function depList() {
    conn.query(query, function (err, res) {
        if (err) throw err;
        let roles = res.map((list) => { return list.title; })
        console.log(roles);
        return roles;
    });
}

function addRole() {
    let query = "SELECT title FROM role";
    inquirer
        .prompt([
            {
                message: 'What is the name of the role?',
                name: 'name',
            },
            {
                message: 'What is the salary of the role?',
                name: 'salary',
            },
            {
                type: 'list',
                message: 'Which department does the role belong to?',
                name: 'role',
                choices: roles,
            }
        ])
        .then((res) => {
            let query = `INSERT INTO department (name) VALUES ("${res.name}");`;
            conn.query(query, function (err, res) {
                if (err) throw err;
                viewDepartments();
                start();
            });
        })
}

function addEmployee() {
    inquirer
        .prompt([
            {
                message: 'What is the employee\'s first name?',
                name: 'first',
            },
            {
                message: 'What is the employee\'s last name?',
                name: 'last',
            },
            {
                type: 'list',
                message: 'What is the employee\'s role?',
                name: 'role',
                choices: roles,
            },
            {
                type: 'list',
                message: 'Who is the employee\'s manager?',
                name: 'manager',
                choices: managers,
            }
        ])
        .then((res) => {
            let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) 
            VALUES ("${res.first}", "${res.last}", "${res.role}", "${res.manager});`;
            conn.query(query, function (err, res) {
                if (err) throw err;
                viewDepartments();
                start();
            });
        })
}
start()