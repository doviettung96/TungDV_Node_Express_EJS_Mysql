const mysql = require("mysql");

let connectDB = function (param) {
    // Add the credentials to access your database
    return new Promise((resolve, reject) => {

        let connection = mysql.createConnection({
            host    : param.host,
            user    : param.user_name,
            password: param.password,
            database: param.db_name,
            port    : param.port
        });

        // connect to mysql
        connection.connect((err) => {
            // in case of error
            if (err) {
                console.log(err.code);
                console.log(err.fatal);

                reject(err);
            }
            resolve(connection);
        });
    });
};

let querryUsers = function (connection) {
    let result = [];
    // Perform a query
    $query = " SELECT `user_name`, `user_password` FROM `user` LIMIT 10";
    return new Promise((resolve, reject) => {
        connection.query($query, (err, rows, fields) => {
            if (err) {
                console.log("An error ocurred performing the query.");
                console.log(err);
                reject(err);
            }
            result = rows;
            resolve(result);
        });
    });
};

let closeConnection = function (connection) {
    // Close the connection
    connection.end(() => {
        // The connection has been closed
    });
};

exports.connectDB = connectDB;
exports.querryUsers = querryUsers;
exports.closeConnection = closeConnection;