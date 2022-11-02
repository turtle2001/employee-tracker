# Employee Tracker

## Description
The goal of this project was to create a database called content management systems (CMS) using SQL to store information about the company's employees.

## Installation
```
npm install
```
## Usage
```sh
node index.js
```
## [Demo](https://drive.google.com/file/d/1h0ef_TK6kJmKVjEoIKjt3Rlze0qfvks9/view)

## Code Snippet
This is and example query
```JavaScript
function viewRoles() {
    let query = "SELECT role.id AS RoleID, role.title AS Title, department.name AS Department, role.salary AS Salary FROM role JOIN department ON department.id = role.department_id;";
    conn.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        start();
    });
}
```

## Author Links
[LinkedIn](https://www.linkedin.com/in/alexis-zaragoza-5baa51242/)
[GitHub](https://github.com/turtle2001)