const mysql = require('mysql');
const app   = require("../config/app.js");

const connection = mysql.createConnection({
    host: app.DB.HOST,
    user: app.DB.USER,
    password: app.DB.PASS,
    database: app.DB.SCHEMA,
});

connection.connect(error => {
    if (error) throw error;
    console.log("DB CONNECTED");
});

module.exports = connection;

