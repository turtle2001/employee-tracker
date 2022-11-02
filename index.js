import inquirer from 'inquirer';
import mysql from 'mysql2';
import cTbale from 'console.table';

const conn = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // MySQL password
        password: '',
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
    let query = "SELECT role.id AS RoleID, role.title AS Title, department.name AS Department, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id;";
    conn.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}

//manager not done
function viewEmployees() {
    let query = "SELECT employee.id AS Id, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Title, department.name AS Department, role.salary AS Salary, employee.id AS Manager FROM employee JOIN role ON role.id = employee.role_id JOIN department ON department.id = role.department_id;";
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
                start();
            });
        })
}

//done
function addRole() {
    conn.query("SELECT * FROM department", (err, res) => {
        if (err) throw err;
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
                    name: 'dep',
                    choices: res,
                }
            ])
            .then((data) => {
                let id;
                for (let i = 0; i < res.length; i++) {
                    if (data.dep == res[i].name) {
                        id = i + 1;
                        break;
                    }
                }
                let query = `INSERT INTO role (title, salary, department_id) VALUES ("${data.name}", ${data.salary}, "${id}");`;
                conn.query(query, function (err, res3) {
                    if (err) throw err;
                    start();
                });
            })
    })
}

function addEmployee() {
    conn.query("SELECT * FROM role", (err, res) => {
        if (err) throw err;
        let list = res.map((list) => { return list.title; })
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
                    choices: list,
                },
                {
                    type: 'list',
                    message: 'Who is the employee\'s manager?',
                    name: 'manager',
                    choices: ['Elon Musk'],
                }
            ])
            .then((data) => {
                let id;
                for (let i = 0; i < res.length; i++) {
                    if (data.role == res[i].title) {
                        id = i + 1;
                        break;
                    }
                }
                let query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${data.first}", "${data.last}", ${id}, 999);`;
                conn.query(query, function (err, res) {
                    if (err) throw err;
                    start();
                });
            })
    })
}

function updateRole() {
    empList();
}

function empList() {
    conn.query("SELECT first_name, last_name FROM employee", (err, res) => {
        if (err) throw err;
        let list = res.map((list) => { return `${list.first_name} ${list.last_name}`; })
        console.log(list);
        return list;
    });
}

function quit() {
    process.quit
}
start()