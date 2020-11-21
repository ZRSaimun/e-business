const mysql = require('mysql');

var getConnection = function(callback) {
    var connection = mysql.createConnection({
        host: '127.0.0.1',
        database: 'ebazar',
        user: 'root',
        password: ''
    });

    connection.connect(function(err) {
        if (err) {
            console.log('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);

    });
    callback(connection);
}

module.exports = {
    getResult: function(sql, params, callback) {
        getConnection(function(connection) {

            if (params == "") {
                connection.query(sql, function(err, result) {
                    if (err) {
                        callback([]);
                    } else {
                        callback(result);
                    }
                });
            } else {
                connection.query(sql, params, function(err, result) {
                    if (err) {
                        callback([]);
                    } else {
                        callback(result);
                    }
                });
            }
            connection.end(function(error) {
                console.log('connection ending ...');
            });
        });
    },
    execute: function(sql, params, callback) {
        getConnection(function(connection) {

            if (params == "") {
                connection.query(sql, function(err, status) {

                    if (err) {
                        callback(false);
                    } else {
                        callback(status);
                    }
                });
            } else {
                connection.query(sql, params, function(err, status) {

                    if (err) {
                        callback(false);
                    } else {
                        callback(status);
                    }
                });
            }
            connection.end(function(error) {
                console.log('connection ending ...');
            });
        });
    }
}