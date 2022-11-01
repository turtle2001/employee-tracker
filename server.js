const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: 'Oaklandaz921.',
        database: 'movies_db'
    },
    console.log(`Connected to the movies_db database.`)
);

function start() {
    inquirer
        .prompt(
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'choice',
                choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role',
                    'View All Departments', 'Add Department', 'Quit', 'View All Employees']
            }
        )
        .then((res) => {
            switch (res.choice) {
                case 'View All Employees':
                    viewEmployees();
                    break;
                case 'Add Employee':
                    addIntern();
                    break;
                case 'Update Employee Role':
                    generateHTML(employees)
                    break;
                case 'View All Roles':
                    addEngineer();
                    break;
                case 'Add Role':
                    addIntern();
                    break;
                case 'View All Departments':
                    generateHTML(employees)
                    break;
                case 'Add Department':
                    addEngineer();
                    break;
                case 'Quit':
                    addIntern();
                    break;
                case 'View All Employees':
                    generateHTML(employees)
                    break;
            }
        })
}

